const { default: axios } = require('axios')
const fs = require('fs')
const process = require('process')

function cat(path, out) {
    fs.readFile(path, 'utf-8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}:\n${err}`)
            process.exit(1)
        }

        handleOutput(data, out)
    })
}

async function webCat(url, out) {
    try {
        const resp = await axios.get(url)
        handleOutput(resp.data, out)
    } catch(err) {
        console.error(`Error fetching ${url}:\n${err}`)
        process.exit(1)
    }
}

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf-8', function(err) {
            if (err) {
                console.error(`Couldn't write ${out}:\n${err}`)
                process.exit(1)
            }
        })
    } else {
        console.log(text)
    }
}

let path = null
let out = null
if (process.argv[2] == '--out') {
    out = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if (path.slice(0,4) == 'http') {
    webCat(path, out)
} else {
    cat(path, out)
}