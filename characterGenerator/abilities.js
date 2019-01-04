var str = 10;
var dex = 10;
var con = 10;
var iq = 10;
var wis = 10;
var cha = 10;

var racialStr = 0;
var racialDex = 0;
var racialCon = 0;
var racialIq = 0;
var racialWis = 0;
var racialCha = 0;

var costMap = {'7': -4, '8': -2, '9': -1, '10': 0, '11': 1, '12': 2, '13': 3, '14': 5, '15': 7, '16': 10, '17': 13, '18': 17};
var currCost;
var maxCost = 20;

function updateStats(){
    updateStr();
    updateDex();
    updateCon();
    updateIq();
    updateWis();
    updateCha();
}

function calculateMod(score){
	var mod = calculateUnsignedMod(score);
	if (mod > 0) {
		mod = "+" + mod;
	}
	return mod;
}

function calculateUnsignedMod(score){
	return mod = Math.floor((score - 10) / 2);
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
    $('#str-info').show();
}
function displayDexInfo(){
    hideAllInfo();
    document.getElementById('dex-info').style.display = 'block';
}
function displayConInfo(){
    hideAllInfo();
    document.getElementById('con-info').style.display = 'block';
}
function displayIqInfo(){
    hideAllInfo();
    document.getElementById('iq-info').style.display = 'block';
}
function displayWisInfo(){
    hideAllInfo();
    document.getElementById('wis-info').style.display = 'block';
}
function displayChaInfo(){
    hideAllInfo();
    document.getElementById('cha-info').style.display = 'block';
}

function incStr(){
    if (str < 18){
	    str++;
	    updateStr();
    }
}
function incDex(){
    if (dex < 18){
	    dex++;
	    updateDex();
    }
}
function incCon(){
    if (con < 18){
	    con++;
	    updateCon();
    }
}
function incIq(){
    if (iq < 18){
	    iq++;
	    updateIq();
    }
}
function incWis(){
    if (wis < 18){
	    wis++;
	    updateWis();
    }
}
function incCha(){
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
}
function decDex(){
    if (dex > 7){
	    dex--;
	    updateDex();
    }
}
function decCon(){
    if (con > 7){
	    con--;
	    updateCon();
    }
}
function decIq(){
    if (iq > 7){
	    iq--;
	    updateIq();
    }
}
function decWis(){
    if (wis > 7){
	    wis--;
	    updateWis();
    }
}
function decCha(){
    if (cha > 7){
	    cha--;
	    updateCha();
    }
}

function resetAbilityBonuses(){
    racialStr = 0;
    racialDex = 0;
    racialCon = 0;
    racialIq = 0;
    racialWis = 0;
    racialCha = 0;
}

function updateAllAbilities(){
    updateStr();
    updateDex();
    updateCon();
    updateIq();
    updateWis();
    updateCha();
}

function deselectFlexAbilities(){
    document.getElementById("str-flex").classList.remove('selected');
    document.getElementById("dex-flex").classList.remove('selected');
    document.getElementById("con-flex").classList.remove('selected');
    document.getElementById("iq-flex").classList.remove('selected');
    document.getElementById("wis-flex").classList.remove('selected');
    document.getElementById("cha-flex").classList.remove('selected');
}

function flexStr(){
    resetAbilityBonuses();
    deselectFlexAbilities();
    racialStr = 2;
    document.getElementById("str-flex").classList.add('selected');
    updateAllAbilities();
}
function flexDex(){
    resetAbilityBonuses();
    deselectFlexAbilities();
    racialDex = 2;
    document.getElementById("dex-flex").classList.add('selected');
    updateAllAbilities();
}
function flexCon(){
    resetAbilityBonuses();
    deselectFlexAbilities();
    racialCon = 2;
    document.getElementById("con-flex").classList.add('selected');
    updateAllAbilities();
}
function flexIq(){
    resetAbilityBonuses();
    deselectFlexAbilities();
    racialIq = 2;
    document.getElementById("iq-flex").classList.add('selected');
    updateAllAbilities();
}
function flexWis(){
    resetAbilityBonuses();
    deselectFlexAbilities();
    racialWis = 2;
    document.getElementById("wis-flex").classList.add('selected');
    updateAllAbilities();
}
function flexCha(){
    resetAbilityBonuses();
    deselectFlexAbilities();
    racialCha = 2;
    document.getElementById("cha-flex").classList.add('selected');
    updateAllAbilities();
}

function updateBarWidth(bar, width) {
    var bars = document.getElementsByClassName(bar);
    for (var i = 0; i < bars.length; ++i) {
        var item = bars[i];
        item.style.width = width + "%";
    }
}

function updateStr(){
	totStr = str + racialStr;
	var width = totStr * 5;
	updateBarWidth('str-bar', width);
	document.getElementById("str-score").innerHTML = "Score: " + totStr + "  (" + calculateMod(totStr) + ")";
	document.getElementById("str-score-mini").innerHTML = "Str: " + totStr + "  (" + calculateMod(totStr) + ")";
	document.getElementById("str-cost").innerHTML = "Cost: " + costMap[str];
	updatePointsSpent();
}
function updateDex(){
	totDex = dex + racialDex;
	var width = totDex * 5;
	updateBarWidth('dex-bar', width);
	document.getElementById("dex-score").innerHTML = "Score: " + totDex + "  (" + calculateMod(totDex) + ")";
	document.getElementById("dex-score-mini").innerHTML = "Dex: " + totDex + "  (" + calculateMod(totDex) + ")";
	document.getElementById("dex-cost").innerHTML = "Cost: " + costMap[dex];
	updatePointsSpent();
}
function updateCon(){
	totCon = con + racialCon;
	var width = totCon * 5;
	updateBarWidth('con-bar', width);
	document.getElementById("con-score").innerHTML = "Score: " + totCon + "  (" + calculateMod(totCon) + ")";
	document.getElementById("con-score-mini").innerHTML = "Con: " + totCon + "  (" + calculateMod(totCon) + ")";
	document.getElementById("con-cost").innerHTML = "Cost: " + costMap[con];
	updatePointsSpent();
}
function updateIq(){
	totIq = iq + racialIq;
	var width = totIq * 5;
	updateBarWidth('iq-bar', width);
	document.getElementById("iq-score").innerHTML = "Score: " + totIq + "  (" + calculateMod(totIq) + ")";
	document.getElementById("iq-score-mini").innerHTML = "Int: " + totIq + "  (" + calculateMod(totIq) + ")";
	document.getElementById("iq-cost").innerHTML = "Cost: " + costMap[iq];
	updatePointsSpent();
	updateLanguages(myRace);
}
function updateWis(){
	totWis = wis + racialWis;
	var width = totWis * 5;
	updateBarWidth('wis-bar', width);
	document.getElementById("wis-score").innerHTML = "Score: " + totWis + "  (" + calculateMod(totWis) + ")";
	document.getElementById("wis-score-mini").innerHTML = "Wis: " + totWis + "  (" + calculateMod(totWis) + ")";
	document.getElementById("wis-cost").innerHTML = "Cost: " + costMap[wis];
	updatePointsSpent();
}
function updateCha(){
	totCha = cha + racialCha;
	var width = totCha * 5;
	updateBarWidth('cha-bar', width);
	document.getElementById("cha-score").innerHTML = "Score: " + totCha + "  (" + calculateMod(totCha) + ")";
	document.getElementById("cha-score-mini").innerHTML = "Cha: " + totCha + "  (" + calculateMod(totCha) + ")";
	document.getElementById("cha-cost").innerHTML = "Cost: " + costMap[cha];
	updatePointsSpent();
}

function updatePointsSpent(){
    currCost = costMap[str] + costMap[dex] + costMap[con] + costMap[iq] + costMap[wis] + costMap[cha];
	if (currCost < maxCost){
	    document.getElementById("total-cost").style.color = "inherit";
		document.getElementById('finish-step-one').classList.remove('disabled');
	}
    else if (currCost > maxCost){
	    document.getElementById("total-cost").style.color = "red";
		document.getElementById('finish-step-one').classList.add('disabled');

	}
    else{
	    document.getElementById("total-cost").style.color = "green";	document.getElementById('finish-step-one').classList.remove('disabled');
	}
	document.getElementById("total-cost").innerHTML = currCost;
	document.getElementById("max-cost").innerHTML = maxCost;
}