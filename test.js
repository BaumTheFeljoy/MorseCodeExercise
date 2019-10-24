const fs = require('fs')

var alphabet = JSON.parse(fs.readFileSync("alphabet.json")).letters
console.log(alphabet)

var a = []

a.findIndex('.---')