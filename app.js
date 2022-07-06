require('dotenv').config()
const http = require('http')
const Gun = require('gun')
const fs = require('fs')
const path = require('path')

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${process.env.NAME}</title>
</head>
<body>
    <div>
        <h1>${process.env.NAME}</h1>
        <p>this is a relay</p>
    </div>
</body>
</html>`

if(!fs.existsSync(path.join(__dirname, 'folder'))){
    fs.mkdirSync(path.join(__dirname, 'folder'))
}
if(!fs.existsSync(path.join(__dirname, 'folder', 'index.html'))){
    fs.writeFileSync(path.join(__dirname, 'folder', 'index.html'), html)
}

Gun({web: http.createServer(Gun.serve(path.join(__dirname, 'folder'))).listen(Number(process.env.PORT), '0.0.0.0'), peers: process.env.RELAYS.split(',').filter(Boolean), multicast: true, radisk: true, file: path.join(__dirname, 'data')})

console.log('Relay peer started on port ' + process.env.PORT + ' with /gun')