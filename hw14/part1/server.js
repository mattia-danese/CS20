var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var readline = require('readline')
var pairs = [];

http.createServer(function (req, res) {
    if(req.url == "/"){
        let index="index.html";
        fs.readFile(index, function (err, txt) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);
            res.end();
        });
    }
    else if (req.url == "/form_submit"){
        if (req.method.toLowerCase() != "post"){
            let index = "index.html";
            fs.readFile(index, function (err, txt) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(txt);
                res.end();
            });
        }
        else {
            const MongoClient = require("mongodb").MongoClient;
            const url = "mongodb+srv://mattia:lunapark@cluster0.giy5w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

            // extracting POST data
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                if (err) {console.log(err);}
                
                // accessing file sent by user
                let path = files["file"]["filepath"];
                let newFile = readline.createInterface({
                    input: fs.createReadStream(path)
                });
                // extracting file contents
                newFile.on('line', function (line) {
                    // excludes column names
                    if (line != "Company,Ticker"){
                        let comp = line.split(',')[0];
                        let tick = line.split(',')[1];
                        pairs.push([comp, tick]);
                    }
                });
            });
            
            // connecting to mongo database
            MongoClient.connect(url, { useUnifiedTopology: true },
                async function (err, db) {
                    if (err) {console.log(err)}
                
                    let dbo = db.db("StockTickerApp");
                    let collection = dbo.collection("companies");

                    // Invariant: No two documents will have any of the same company names or company tickers
                    
                    for(i=0; i<pairs.length;i++){
                        let name = pairs[i][0];
                        let tick = pairs[i][1];
                    
                        // avoids duplicate pairs
                        if(await collection.count({$and: [{names: name}, {tickers: tick}]}) == 0){
                            if(await collection.count({names: name}) > 0){
                                // apend ticker to existing document
                                await collection.updateOne({names: name},
                                                {$push: {tickers: tick}});
                            }
                            else if(await collection.count({tickers: tick}) > 0){
                                // apend company name to existing document
                                await collection.updateOne({tickers: tick},
                                                {$push: {names: name}});
                            }
                            else {
                                // create new document for company,ticker pair
                                await collection.insertOne({names: [name], tickers: [tick]});
                            }
                        }
                    }
                    db.close();
                });
            
            // output displaying data was adding to database
            let index="index.html";
            fs.readFile(index, function(err, txt) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(txt);
                res.write("<h4>Your data has been added to the database!</h4>");
                res.end();
            });
        }
    }
    else {
        let error="error.html";
        fs.readFile(error, function(err, txt) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);
            res.end();
        });
    }
}).listen(8080);