async function setupAJAX(){
    let req = new XMLHttpRequest();
    if(!req){
        console.log("Can't create HTTPRequest object!");
    }

    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("ajax").innerHTML = this.responseText;
        }};

    req.open("GET", "https://bible-api.com/john 3:16", true);
    req.send();
}

async function setupFetch(){
    let res = await fetch("https://bible-api.com/john 3:16");
    let data = await res.json();
    document.getElementById("fetch").innerHTML = JSON.stringify(data);
}

function initialize(){
    setupAJAX();
    setupFetch();
}