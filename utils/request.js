const axios = require('axios')
const https = require('https')
const path = require('path')
const { log } = require('./log')
const filename = path.basename(__filename,path.extname(__filename))

async function request(config, payload) {
    console.log('request()', config)
    console.log('request()', payload)
    delete config.headers['']
    try {
        let axiosConfig = {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
              }),
            method: config.metodo,
            url: config.url,
            headers: config.headers || '',
            params: config.metodo === 'GET' ? payload : '',
            data: config.metodo === 'POST' ? payload : ''
        }
        log(filename, `REQUEST: ${JSON.stringify(axiosConfig)}`)
        let response = await axios(axiosConfig)
        log(filename, `RESPONSE: ${JSON.stringify(response.data)}`)
        return response
    } catch (err) {
        console.log(err)
        log(filename, `ERROR: ${err}`)
        return err
    }
}

module.exports = request