const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
const figlet = require('figlet')
const { json } = require('stream/consumers')



const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);

    console.log(page)


    const getFilename = (file, contentType) => {
        fs.readFile(file, function(err, data){
            res.writeHead(200, {'content-Type' : contentType})
            res.write(data)
            res.end()
        });
    }
    switch(page){
        case '/':
            getFilename('index.html', 'text/html');
            break;

        case '/contact':
            getFilename('contact.html', 'text/html');
            break;

        case '/about':
            getFilename('about.html', 'text/html');
            break;
            
        case '/api':
            let user = 'unknown'
            let status = 'unknown'
            let currentOccupation = 'unknown'

            if(params['student'] == 'sullivan'){
                user = 'sullivan'
                status = 'Amazon Dveloper'
                currentOccupation = 'Developer'
            } 
            res.writeHead(200, {'content-Type' : 'application/json'})
            const objToJason = {
                name: user,
                status: status,
                currentOccupation: currentOccupation
            }

            res.end(JSON.stringify(objToJason));
            break;

            case '/css/style.css':
                fs.readFile('css/style.css', function(err, data){
                    res.writeHead(200, {'content-Type' : 'text/css'})
                    res.write(data)
                    res.end()
                });
                break;

            case '/js/main.js':
                fs.readFile('js/main.js', function(err, data){
                    res.writeHead(200, {'content-Type' : 'text/javascript'});
                    res.write(data)
                    res.end();
                });
            break;

            default:
                figlet('404!!', function(err, data){
                    if(err){
                        console.log('something went wrong......')
                        console.log(dir)
                        return;
                    }
                    res.write(data)
                    res.end()
                })




        }
})

server.listen(8000);