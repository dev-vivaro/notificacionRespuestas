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

const axios = require('axios')
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
})