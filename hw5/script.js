function determinePick(){
    pick = [];
    while (pick.length < 5){
        num = Math.floor(Math.random() * 48) + 1;  //check this
        if(pick.indexOf(num) == -1){
            pick.push(num);}
    }

    pick_unsorted = [...pick];
    pick.sort(function(a, b){return a - b});

    return pick, pick_unsorted;
}

function determineMatches(pick, lucky){
    lucky_match = false;
    winning_nums = [12, 15, 24, 35, 48];
    winning_lucky = 3;
    matches = 0;

    for(i = 0; i < 6; i++){
        if(winning_nums.indexOf(pick[i]) != -1){
            matches += 1;}}
    if(lucky == winning_lucky){
        lucky_match = true;}

    return matches, lucky_match;
}

function determinePayout(matches, lucky_match){
    table = [
        "$4",
        "$6",
        "$3",
        "$25",
        "$20",
        "$150",
        "$200",
        "$5,000",
        "$25,000 a YEAR for LIFE",
        "$7,000 a WEEK for LIFE"
    ];

    payout = "";
    if(matches >= 2) {
        if(lucky_match == true){
            payout = table[(matches - 1) * 2 + 1];
        }
        else{
            payout = table[(matches - 1) * 2];}
    } 
    else {
        if(matches == 0 && lucky_match == true){
            payout = table[0];
        }
        else{
            if(matches == 1 && lucky_match == true){
                payout = table[1];
            }
            else {payout = "$0";}
        }
    }

    return payout;
}

function updateDOM(pick, pick_unsorted, lucky, matches, lucky_match, payout){
    document.getElementById("load").style = "display: none;";
    document.getElementById("load").innerHTML = "Picking Your Numbers";
    
    document.getElementById("pick").innerHTML = pick_unsorted.join(', ');
    document.getElementById("pick_sorted").innerHTML = pick.join(', ');
    document.getElementById("lucky_ball").innerHTML = lucky;

    document.getElementById("matches").innerHTML = matches;
    if(lucky_match == true){
        document.getElementById("match_lucky").innerHTML = "Yes!";}
    else{
        document.getElementById("match_lucky").innerHTML = "No.";}

    document.getElementById("payout").innerHTML = payout;

    document.getElementsByTagName("button")[0].innerHTML = "Click to Play Again!";
    document.getElementById("container").style = "display: block;";
}

function addDot(){
    document.getElementById("load").innerHTML += ".";
}


function loading(){
    load = document.getElementById("load");
    load.style = "display: block;";

    for(i=0; i < 3;i++){
        setTimeout(addDot, 500 + (i*2000));
        setTimeout(addDot, 1000 + (i*2000));
        setTimeout(addDot, 1500 + (i*2000));
        if(i != 2){
            setTimeout(function() {load.innerHTML = "Picking Your Numbers";}, 2000 + (i*2000));
        }
    }
}

function game(){
    document.getElementById("container").style = "display: none;";

    pick, pick_unsorted = determinePick();
    lucky = Math.floor(Math.random() * 18) + 1;

    matches, lucky_match = determineMatches(pick, lucky);

    payout = determinePayout(matches, lucky_match);

    loading();

    setTimeout(function() {updateDOM(pick, pick_unsorted, lucky, matches, lucky_match, payout)}, 6000);
}