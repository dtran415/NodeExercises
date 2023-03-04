const { default: axios } = require('axios')
const fs = require('fs')
const process = require('process')

function cat(path) {
    fs.readFile(path, 'utf-8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}:\n${err}`)
            process.exit(1)
        }

        console.log(data)
    })
}

async function webCat(url) {
    try {
        const resp = await axios.get(url)
        console.log(resp.data)
    } catch(err) {
        console.error(`Error fetching ${url}:\n${err}`)
        process.exit(1)
    }
}

const path = process.argv[2]

if (path.slice(0,4) == 'http') {
    webCat(path)
} else {
    cat(path)
}