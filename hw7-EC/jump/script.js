function jump(){
    var direction = document.getElementById("but").innerHTML;
    var right = direction.indexOf('&gt;') != -1 ? true : false;
    var text;

    if(right == true){
        text = document.getElementById("in1").value
        document.getElementById("in1").value = "";
        document.getElementById("in2").value = text
        document.getElementById("but").innerHTML = "< JUMP";

    }
    else{
        text = document.getElementById("in2").value
        document.getElementById("in2").value = "";
        document.getElementById("in1").value = text
        document.getElementById("but").innerHTML = "JUMP >";
    }
}

function checking(){
    var label = document.getElementById("all_label");
    var check = label.innerHTML.indexOf("Un") == -1 ? true : false;
    var boxes = document.getElementsByClassName("indiv");

    if(check){
        for(i=0; i < boxes.length; i++){
            boxes[i].checked = true;
        }
        label.innerHTML = "Uncheck All";
    }
    else{
        for(i=0; i < boxes.length; i++){
            boxes[i].checked = false;
        }
        label.innerHTML = "Check All";
    }
}