import http from 'http'
import fs from 'fs'

const PORT =  3030

http.createServer((req, res) => {
    // set the status code and the MIME type
    res.writeHead(200, { 'Content-Type': 'application/pdf' })
    
    // reading the html content
    fs.readFile('monk.pdf', (err, data) => {
        if(err){
			res.json({'status':'error',msg:err});
		}else{			
			res.write(data);
			res.end();       
		}
    })
}).listen(PORT, () => console.log('listening on port', PORT))