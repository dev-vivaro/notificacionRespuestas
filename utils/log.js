const { appendFileSync } = require('fs')
const { getDate } = require('./getdate')

function log(filename, info) {
	let hr = new Date()
	let archivoLog = getDate()
	appendFileSync(
		`././logs/${filename}.${archivoLog}`,
		`${hr} | ${info}\r\n`
	)
	return
}

module.exports = { log }