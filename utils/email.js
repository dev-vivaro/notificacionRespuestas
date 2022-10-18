const nodemailer = require('nodemailer')
const dbconfig = require('../db/config.json')

async function email( mensaje ) {
  try {
    let transporter = nodemailer.createTransport(dbconfig.email.config, dbconfig.email.remitente)
    let response = await transporter.sendMail(mensaje)
    transporter.close()
    return response
  } catch (err) {
    return err
  }
}

module.exports = { email }