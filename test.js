/* let campanas = [ { IdEnvioPr: 135077, ModoNotificacion: 1, CorreoEndpoint:'cacarreon@marcatel.net;' }, { IdEnvioPr: 135124, ModoNotificacion: 2, CorreoEndpoint: 'gl18n5cd5p1uuplh.b.requestbin.net' } ]
let registros = [
  {
    IdEnvioPr: 135077,
    IdRespuesta: 868086,
    Telefono: '8111699864',
    Texto: 'RESPUESTA2',
    MensajeOriginal: '',
    NombreEnvio: 'prueba con notificacion 26 octubre',
    FechaBD: '2022-06-03T13:06:33.480Z',
    ModoNotificacion: 1,
    CorreoEndpoint: 'cacarreon@marcatel.net;',
    TokenEndpoint: 'a7d56abf-950e-4ecc-9a7c',
    FechaInicial: '2020-10-26T13:00:27.280Z',
    FrecuenciaMinutos: 5,
    EnviarNotificacion: 2
  },
  {
    IdEnvioPr: 135124,
    IdRespuesta: 868091,
    Telefono: '8115591189',
    Texto: 'Respuesta de prueba',
    MensajeOriginal: 'Este es un mensaje de 2 vias.',
    NombreEnvio: 'EI20201121125032',
    FechaBD: '2022-06-03T13:06:33.480Z',
    ModoNotificacion: 2,
    CorreoEndpoint: 'gl18n5cd5p1uuplh.b.requestbin.net',
    TokenEndpoint: 'a7d56abf-950e-4ecc-9a7c',
    FechaInicial: '2020-11-21T12:50:36.057Z',
    FrecuenciaMinutos: 5,
    EnviarNotificacion: 2
  },
  {
    IdEnvioPr: 135124,
    IdRespuesta: 868092,
    Telefono: '8115591189',
    Texto: 'Otro mensaje de respuesta de prueba',
    MensajeOriginal: 'Este es un mensaje de 2 vias.',
    NombreEnvio: 'EI20201121125032',
    FechaBD: '2022-06-03T13:06:33.480Z',
    ModoNotificacion: 2,
    CorreoEndpoint: 'gl18n5cd5p1uuplh.b.requestbin.net',
    TokenEndpoint: 'a7d56abf-950e-4ecc-9a7c',
    FechaInicial: '2020-11-21T12:50:36.057Z',
    FrecuenciaMinutos: 5,
    EnviarNotificacion: 2
  },
  {
    IdEnvioPr: 135124,
    IdRespuesta: 868093,
    Telefono: '8115591189',
    Texto: 'Otro mensaje de respuesta de prueba',
    MensajeOriginal: 'Este es un mensaje de 2 vias.',
    NombreEnvio: 'EI20201121125032',
    FechaBD: '2022-06-03T13:06:33.480Z',
    ModoNotificacion: 2,
    CorreoEndpoint: 'agl18n5cd5p1uuplh.b.requestbin.net',
    TokenEndpoint: 'a7d56abf-950e-4ecc-9a7c',
    FechaInicial: '2020-11-21T12:50:36.057Z',
    FrecuenciaMinutos: 5,
    EnviarNotificacion: 2
  }
]


let segmentadas = campanas.map(campana =>{
  return registros.filter(reg => reg.IdEnvioPr == campana.IdEnvioPr && reg.ModoNotificacion == campana.ModoNotificacion && reg.CorreoEndpoint == campana.CorreoEndpoint)
})
console.log(segmentadas)

let params = segmentadas[1].map(reg=>{
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
console.log(params) */

/* const axios = require('axios')
let config = {
  headers: {
    'Content-Type': 'application/json',
   // 'Authorization': `Basic ${resCampanas[index].TokenEndpoint}`
  }
}
axios.post('http://gl18n5cd5p1uuplh.b.requestbin.net', {info: 'ok'}, config)
.then(res=>{
  console.log('exito',res)
}).catch(err=>{
  console.log('error', err)
}) */

// const request = require('./utils/request')

// let config = {
//   metodo: 'POST',
//   headers: {
//     'Authorization': 'Bearer awer8g4fd2w6erg4edrfg84',
//     'other-header': '123456789'
//   },
//   endpoint: 'https://eo1nbnqvfuo95p2.m.pipedream.net',
// }

// let payload = {
//   user: 'test',
//   pass: 'test1'
// }

// request(config, payload)
// .then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
// })

let dbResponse = {"recordsets":[[{"IdEnvioPr":137298,"ModoNotificacion":1,"CorreoEndpoint":"cacarreon@vivaro.com;","TokenEndpoint":""},{"IdEnvioPr":137300,"ModoNotificacion":1,"CorreoEndpoint":"cacarreon@vivaro.com;","TokenEndpoint":""}],[{"IdEnvioPr":137300,"IdRespuesta":869088,"Telefono":"8111699864","MensajeRespuesta":"rESPUESTA 12:22","MensajeOriginal":"mensaje 12:21","NombreEnvio":"prueba correos carlos 1","Fecha":"Jan  4 2023  4:16PM","Columna1":"8111699864","Columna2":"Este es un mensaje corto más útil más útil más útil más útil más útil más útil","Columna3":"LEN(B2)","Columna4":"1","Columna5":"0","Columna6":"-","Columna7":"-","Columna8":"-","Columna9":"-","Columna10":"-","ModoNotificacion":1,"CorreoEndpoint":"cacarreon@vivaro.com;","TokenEndpoint":"","FechaInicial":"2022-10-25T12:21:56.857Z","FrecuenciaMinutos":5,"EnviarNotificacion":0},{"IdEnvioPr":137298,"IdRespuesta":869087,"Telefono":"8111699864","MensajeRespuesta":"rESPUESTA 10:30","MensajeOriginal":"mensaje 10:29","NombreEnvio":"envio prueba r5","Fecha":"Jan  4 2023  4:16PM","Columna1":"8111699864","Columna2":"Este es un mensaje corto más útil más útil más útil más útil más útil más útil","Columna3":"LEN(B2)","Columna4":"1","Columna5":"0","Columna6":"-","Columna7":"-","Columna8":"-","Columna9":"-","Columna10":"-","ModoNotificacion":1,"CorreoEndpoint":"cacarreon@vivaro.com;","TokenEndpoint":"","FechaInicial":"2022-10-25T10:29:13.377Z","FrecuenciaMinutos":5,"EnviarNotificacion":2}]],"recordset":[{"IdEnvioPr":137298,"ModoNotificacion":1,"CorreoEndpoint":"cacarreon@vivaro.com;","TokenEndpoint":""},{"IdEnvioPr":137300,"ModoNotificacion":1,"CorreoEndpoint":"cacarreon@vivaro.com;","TokenEndpoint":""}],"output":{},"rowsAffected":[],"returnValue":0}
let config = {"tipoEntrega":"1","frecuencia":"1","peticionToken":{"metodo":"GET","url":"https://endpoint.com/auth","headers":{"auth":"12345"},"parametros":{"texto":"test","user":"user1"}},"peticionNotificacion":{"metodo":"POST","url":"https://eo1nbnqvfuo95p2.m.pipedream.net","headers":{"token":"321654987"},"parametros":{"mensaje":"MensajeRespuesta","telefono":"Telefono","fecha":"Fecha"}}}
// console.log(dbResponse.recordsets[1])
let params = {}

dbResponse.recordsets[1].map(reg => {
  Object.keys(config.peticionNotificacion.parametros).map(parametro => {
    params[parametro] = reg[config.peticionNotificacion.parametros[parametro]]
  })
})
console.log(params)