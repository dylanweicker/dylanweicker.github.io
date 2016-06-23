var str = 10;
var dex = 10;
var con = 10;
var iq = 10;
var wis = 10;
var cha = 10;

var strBonus = 0;
var dexBonus = 0;
var conBonus = 0;
var iqBonus = 0;
var wisBonus = 0;
var chaBonus = 0;

var costMap = {'7': -4, '8': -2, '9': -1, '10': 0, '11': 1, '12': 2, '13': 3, '14': 5, '15': 7, '16': 10, '17': 13, '18': 17};
var currCost;
var maxCost;

function updateStats(){
  updateStr();
  updateDex();
  updateCon();
  updateIq();
  updateWis();
  updateCha();
}

function calculateMod(score){
	var mod = Math.floor((score - 10) / 2);
	if (mod >= 0) {
		mod = "+" + mod;
	}
	return mod;
}

function setupAbilities(){
    displayStrInfo();
    document.getElementById('radio-20').checked = true;
    setMaxCost(20);
}

function setMaxCost(cost){
    maxCost = cost;
	updatePointsSpent();
}

function hideAllInfo(){
    document.getElementById('str-info').style.display = 'none';
    document.getElementById('dex-info').style.display = 'none';
    document.getElementById('con-info').style.display = 'none';
    document.getElementById('iq-info').style.display = 'none';
    document.getElementById('wis-info').style.display = 'none';
    document.getElementById('cha-info').style.display = 'none';
}
function displayStrInfo(){
    hideAllInfo();
    document.getElementById('str-info').style.display = 'block';
}function displayDexInfo(){
    hideAllInfo();
    document.getElementById('dex-info').style.display = 'block';
}function displayConInfo(){
    hideAllInfo();
    document.getElementById('con-info').style.display = 'block';
}function displayIqInfo(){
    hideAllInfo();
    document.getElementById('iq-info').style.display = 'block';
}function displayWisInfo(){
    hideAllInfo();
    document.getElementById('wis-info').style.display = 'block';
}function displayChaInfo(){
    hideAllInfo();
    document.getElementById('cha-info').style.display = 'block';
}

function incStr(){
    if (str < 18){
	    str++;
	    updateStr();
    }
}function incDex(){
    if (dex < 18){
	    dex++;
	    updateDex();
    }
}function incCon(){
    if (con < 18){
	    con++;
	    updateCon();
    }
}function incIq(){
    if (iq < 18){
	    iq++;
	    updateIq();
    }
}function incWis(){
    if (wis < 18){
	    wis++;
	    updateWis();
    }
}function incCha(){
    if (cha < 18){
	    cha++;
	    updateCha();
    }
}

function decStr(){
    if (str > 7){
	    str--;
	    updateStr();
    }
}function decDex(){
    if (dex > 7){
	    dex--;
	    updateDex();
    }
}function decCon(){
    if (con > 7){
	    con--;
	    updateCon();
    }
}function decIq(){
    if (iq > 7){
	    iq--;
	    updateIq();
    }
}function decWis(){
    if (wis > 7){
	    wis--;
	    updateWis();
    }
}function decCha(){
    if (cha > 7){
	    cha--;
	    updateCha();
    }
}

function updateStr(){
	totStr = str + strBonus;
	var width = str * 5;
	document.getElementById('str-bar').style.width = width + "%";
	document.getElementById("str-score").innerHTML = "Score: " + totStr + "  (" + calculateMod(totStr) + ")";
	document.getElementById("str-cost").innerHTML = "Cost: " + costMap[str];
	updatePointsSpent();
}function updateDex(){
	totDex = dex + dexBonus;
	var width = dex * 5;
	document.getElementById('dex-bar').style.width = width + "%";
	document.getElementById("dex-score").innerHTML = "Score: " + totDex + "  (" + calculateMod(totDex) + ")";
	document.getElementById("dex-cost").innerHTML = "Cost: " + costMap[dex];
	updatePointsSpent();
}function updateCon(){
	totCon = con + conBonus;
	var width = con * 5;
	document.getElementById('con-bar').style.width = width + "%";
	document.getElementById("con-score").innerHTML = "Score: " + totCon + "  (" + calculateMod(totCon) + ")";
	document.getElementById("con-cost").innerHTML = "Cost: " + costMap[con];
	updatePointsSpent();
}function updateIq(){
	totIq = iq + iqBonus;
	var width = iq * 5;
	document.getElementById('iq-bar').style.width = width + "%";
	document.getElementById("iq-score").innerHTML = "Score: " + totIq + "  (" + calculateMod(totIq) + ")";
	document.getElementById("iq-cost").innerHTML = "Cost: " + costMap[iq];
	updatePointsSpent();
}function updateWis(){
	totWis = wis + wisBonus;
	var width = wis * 5;
	document.getElementById('wis-bar').style.width = width + "%";
	document.getElementById("wis-score").innerHTML = "Score: " + totWis + "  (" + calculateMod(totWis) + ")";
	document.getElementById("wis-cost").innerHTML = "Cost: " + costMap[wis];
	updatePointsSpent();
}function updateCha(){
	chaStr = cha + chaBonus;
	var width = cha * 5;
	document.getElementById('cha-bar').style.width = width + "%";
	document.getElementById("cha-score").innerHTML = "Score: " + totCha + "  (" + calculateMod(totCha) + ")";
	document.getElementById("cha-cost").innerHTML = "Cost: " + costMap[cha];
	updatePointsSpent();
}

function updatePointsSpent(){
    currCost = costMap[str] + costMap[dex] + costMap[con] + costMap[iq] + costMap[wis] + costMap[cha];
	if (currCost < maxCost){
	    document.getElementById("total-cost").style.color = "inherit";
		document.getElementById('continue-step-one').classList.remove('disabled');
	}else if (currCost > maxCost){
	    document.getElementById("total-cost").style.color = "red";
		document.getElementById('continue-step-one').classList.add('disabled');
	}else{
	    document.getElementById("total-cost").style.color = "green";
		document.getElementById('continue-step-one').classList.remove('disabled');
	}
	document.getElementById("total-cost").innerHTML = "Total Cost: " + currCost;
}