var http = require('http');
var fs = require('fs');

http.createServer(async function (req, res) {
    
    if(req.url == "/"){
        let index = "index.html";
        fs.readFile(index, function (err, txt) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);
            res.end();
        });
    }
    else if (req.url.substring(0,12) == "/form_submit"){
        if (req.url.indexOf('?') == -1){
            // console.log("here", req);
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

            let data = req.url.split('?')[1].split('&');
            let search = data[0].split('=')[1];
            let n_or_t = data[1].split('=')[1];
            let result = "", content = "";

            // connecting to mongo database
            MongoClient.connect(url, { useUnifiedTopology: true },
                async function (err, db) {
                    if (err) {console.log(err)}
                
                    let dbo = db.db("StockTickerApp");
                    let collection = dbo.collection("companies");

                    // Invariant: No two documents will have any of the same company names or company tickers

                    if(n_or_t == "name"){
                        // search for company by name
                        result = await collection.find({names: search}).toArray();
                        if(result.length == 0){
                            content = `<h3>No information on company '${search}' could be found</h3>`;
                        }
                        else {                            
                            content = `<h3>Company Name: ${search} <br> Ticker(s): `;
                            for(i=0; i < result[0]["tickers"].length; i++){
                                content += result[0]["tickers"][i];
                                
                                if (i != result[0]["tickers"].length - 1)
                                    content += ", ";
                            }
                        }
                    }
                    else {
                        result = await collection.find({tickers: search}).toArray();
                        if(result.length == 0){
                            content = `<h3>No information on company with ticker '${search}' could be found</h3>`;
                        }
                        else {
                            content = "<h3>Company Name(s): ";
                            for(i=0; i < result[0]["names"].length; i++){
                                content += result[0]["names"][i];
                                
                                if (i != result[0]["names"].length - 1)
                                    content += ", ";
                            }

                            content += `<br> Ticker: ${search}</h3>`;
                        }
                    }
                    db.close();
                
                    // output displaying company data
                    let index="index.html";
                    fs.readFile(index, function(err, txt) {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(txt);
                        res.write(content);
                        res.end();
                    });
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
}).listen(process.env.PORT || 8080);
