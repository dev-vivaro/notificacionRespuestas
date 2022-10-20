const PID = process.pid
process.title = `PID: ${PID}`
const sql = require('mssql')
const axios = require('axios')
const path = require('path')
const db = require('./db/db')
const { log } = require('./utils/log')
const { email } = require('./utils/email')
const filename = path.basename(__filename,path.extname(__filename))
let pool

const envioNotificacion = async () => {
	log(filename, `Buscando respuestas pendientes.`)
	let registros
	
  //consulta respuestas pendientes
	try {
    await pool
    registros = await pool
      .request()
      .execute('usp_NotificaRespuestasSMS')
  } catch (err) {
    log(filename, `ERROR: ${JSON.stringify(err)}`)
    setTimeout(envioNotificacion, 5000)
  }
  
  //genera notificaciones por tipo
	if (registros.recordset.length > 0) {
		log(filename,`Enviando ${registros.recordsets[1].length} registros.`)
    // se separan recordsets
    let resCampanas = registros.recordsets[0]
    let resRegistros = registros.recordsets[1]
    log(filename, `${JSON.stringify(registros)}`)
    
    // se segmentan registros por campaña y correo/endpoint
    let segmentadas = resCampanas.map(campana =>{
      return resRegistros.filter(reg => reg.IdEnvioPr == campana.IdEnvioPr && reg.ModoNotificacion == campana.ModoNotificacion && reg.CorreoEndpoint == campana.CorreoEndpoint)
    })

		const promises = segmentadas.map(async (lote, index) => {
      // notificaciones por correo
      if(resCampanas[index].ModoNotificacion == 1){
        try {
          
          // se llena tabla html para correo
          let tabla =''
          lote.forEach(reg => {
            tabla += `
            <tr>
            <td> ${reg.IdEnvioPr} </td>
            <td> ${reg.IdRespuesta} </td>
            <td> ${reg.Telefono} </td>
            <td> ${reg.Texto} </td>
            <td> ${reg.MensajeOriginal} </td>
            <td> ${reg.NombreEnvio} </td>
            <td> ${reg.FechaBD} </td>
            <td> ${reg.Columna1} </td>
            <td> ${reg.Columna2} </td>
            <td> ${reg.Columna3} </td>
            <td> ${reg.Columna4} </td>
            <td> ${reg.Columna5} </td>
            <td> ${reg.Columna6} </td>
            <td> ${reg.Columna7} </td>
            <td> ${reg.Columna8} </td>
            <td> ${reg.Columna9} </td>
            <td> ${reg.Columna10} </td>
            </tr>`
          })

          let html = `
          <html >
            <head>
              <meta name="viewport" content="width=device-width" />
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              </head>
            <body>
              <div style="font-family: Arial; background-color: #fcd226; text-align: center; padding: 20px; color: white; font-weight: bold">
                  RESPUESTAS RECIBIDAS
              </div>
              <table>
                <thead style="color:white; background-color: black;">
                  <tr style="font-family: Arial; font-size: 13px;">
                    <th>IdCampaña</th>
                    <th>IdRespuesta</th>
                    <th>Teléfono</th>
                    <th>Texto</th>
                    <th>Mensaje Original</th>
                    <th>Nombre Envío</th>
                    <th>Fecha Respuesta</th>
                    <th>Columna1</th>
                    <th>Columna2</th>
                    <th>Columna3</th>
                    <th>Columna4</th>
                    <th>Columna5</th>
                    <th>Columna6</th>
                    <th>Columna7</th>
                    <th>Columna8</th>
                    <th>Columna9</th>
                    <th>Columna10</th>
                  </tr>
                </thead>
                <tbody>
                  ${tabla}
                </tbody>
              </table>
              <p>
                  <span style="color: #999999; font-family: Arial; font-size: 12px;">Por favor, no responda este correo ya que este es un correo automatizado s&oacute;lo para notificaciones. Si tiene alguna duda o sugerencia puede ponerse en contacto con el administrador del sistema.<strong> powered by VIVARO</strong>
                  </span>
              </p>
            </body>
          </html>
          `
          // se genera email a enviar
          let mensaje = {
            to: resCampanas[index].CorreoEndpoint,
            subject: 'Notificación de Respuestas',
            html: html
          }

          // se envia email con lote de respuestas
          let resultado = await email( mensaje )

          //  se actualizan respuestas enviadas en lote
          lote.forEach(async reg => {
            log(filename, `${reg.IdRespuesta} | ${JSON.stringify(resultado)}`)
            let actualizado = await pool
              .request()
              .input('IdRespuesta', sql.Int, reg.IdRespuesta)
              .execute('usp_ActualizaRespuestasNotificadasWS') //SP actualiza resultado
          })

          return 1
        } catch (err) {

          // se actualizan respuestas que no pudieron ser procesadas
          lote.forEach(async reg => {
            log(filename, `${reg.IdRespuesta} | ${JSON.stringify(err)}`)
            let actualizado = await pool
              .request()
              .input('IdRespuesta', sql.Int, reg.IdRespuesta)
              .execute('usp_ActualizaRespuestasNotificadasWS') //SP actualiza resultado
          })
          
          return 0
        }  
      } else {// notificaciones por endpoint
        try {

          let params = lote.map(reg => {
            return {
              IdEnvioPr: reg.IdEnvioPr,
              IdRespuesta: reg.IdRespuesta,
              Telefono: reg.Telefono,
              Texto: reg.Texto,
              MensajeOriginal: reg.MensajeOriginal,
              NombreEnvio: reg.NombreEnvio,
              Fecha: reg.FechaBD
            }
          })

          let config = {
            headers: {
              'Content-Type': 'application/json',
            }
          }
          if(resCampanas[index].TokenEndpoint !== ''){
            config.headers.Authorization = `Basic ${resCampanas[index].TokenEndpoint}`
          }

          // se realiza peticion hacia el endpoint
          let resPeticion = await axios.post(resCampanas[index].CorreoEndpoint, params, config)

          //  se actualizan respuestas enviadas en lote
          lote.forEach(async reg => {
            log(filename, `${reg.IdRespuesta} | ${JSON.stringify(resPeticion.data)}`)
            let actualizado = await pool
              .request()
              .input('IdRespuesta', sql.Int, reg.IdRespuesta)
              .execute('usp_ActualizaRespuestasNotificadasWS') //SP actualiza resultado
          })
          
          return 1
        } catch (err) {
          console.log(err)
          lote.forEach(async reg => {
            log(filename, `${reg.IdRespuesta} | ${JSON.stringify(err)}`)
            let actualizado = await pool
              .request()
              .input('IdRespuesta', sql.Int, reg.IdRespuesta)
              .execute('usp_ActualizaRespuestasNotificadasWS') //SP actualiza resultado
          })
          return 0
        }
        
      }
			
		})// termina llenado de promesas

		await Promise.allSettled(promises)
		//console.log('se resuelven promesas')
		// log(JSON.stringify(results))
	} else {
		log(
      filename,
			`No hay registros pendientes.`
		)
	}
	setTimeout(envioNotificacion, 5000) //espera 5 segundo para ejecutarse nuevamente
}

(async ()=>{
	pool = await db.getConnQA()
	envioNotificacion()
	return 
})()
