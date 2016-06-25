
var step = 0;
function advance(){
	step++;
	hideAllSteps();
	switch (step){
		case 0:
			document.getElementById('step-one').style.display = "block";
			document.getElementById('stepper-one').classList.add('active-step');
			break;
		case 1:
			document.getElementById('step-two').style.display = "block";
			document.getElementById('stepper-one').classList.remove('active-step');
			document.getElementById('stepper-one').classList.add('completed-step');
			document.getElementById('stepper-two').classList.remove('inactive');
			document.getElementById('stepper-two').classList.add('active-step');
			break;
		case 2:
			document.getElementById('step-three').style.display = "block";
			document.getElementById('stepper-two').classList.remove('active-step');
			document.getElementById('stepper-two').classList.add('completed-step');
			document.getElementById('stepper-three').classList.remove('inactive');
			document.getElementById('stepper-three').classList.add('active-step');
			break;
		case 3:
			document.getElementById('step-four').style.display = "block";
			document.getElementById('stepper-three').classList.remove('active-step');
			document.getElementById('stepper-three').classList.add('completed-step');
			document.getElementById('stepper-four').classList.remove('inactive');
			document.getElementById('stepper-four').classList.add('active-step');
			break;
		case 4:
			document.getElementById('step-five').style.display = "block";
			document.getElementById('stepper-four').classList.remove('active-step');
			document.getElementById('stepper-four').classList.add('completed-step');
			document.getElementById('stepper-five').classList.remove('inactive');
			document.getElementById('stepper-five').classList.add('active-step');
			break;
		case 5:
			document.getElementById('step-six').style.display = "block";
			document.getElementById('stepper-five').classList.remove('active-step');
			document.getElementById('stepper-five').classList.add('completed-step');
			document.getElementById('stepper-six').classList.remove('inactive');
			document.getElementById('stepper-six').classList.add('active-step');
			break;
	}
 }

function hideAllSteps(){
	document.getElementById('step-one').style.display = 'none';
	document.getElementById('step-two').style.display = 'none';
	document.getElementById('step-three').style.display = 'none';
	document.getElementById('step-four').style.display = 'none';
	document.getElementById('step-five').style.display = 'none';
	document.getElementById('step-six').style.display = 'none';
}
 
//--- Abilities Section --------
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
	var mod = calculateUnsignedMod(score);
	if (mod >= 0) {
		mod = "+" + mod;
	}
	return mod;
}

function calculateUnsignedMod(score){
	return mod = Math.floor((score - 10) / 2);
}

function setupAbilities(){
	hideAllSteps();
	document.getElementById('step-one').style.display = "block";
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
	updateBonusLanguages();
}function updateWis(){
	totWis = wis + wisBonus;
	var width = wis * 5;
	document.getElementById('wis-bar').style.width = width + "%";
	document.getElementById("wis-score").innerHTML = "Score: " + totWis + "  (" + calculateMod(totWis) + ")";
	document.getElementById("wis-cost").innerHTML = "Cost: " + costMap[wis];
	updatePointsSpent();
}function updateCha(){
	totCha = cha + chaBonus;
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

//--- Races Section --------
var races = {dwarf: 1, elf: 2, halfling: 3, human: 4};
var myRace;

function deselectRaces(){
	document.getElementById('dwarf-selection-card').classList.remove('selected-card');
	document.getElementById('elf-selection-card').classList.remove('selected-card');
	document.getElementById('halfling-selection-card').classList.remove('selected-card');
	document.getElementById('human-selection-card').classList.remove('selected-card');
}

function becomeDwarf(){
	deselectRaces();
	document.getElementById('dwarf-selection-card').classList.add('selected-card');
	myRace = races.dwarf;
}

function becomeElf(){
	deselectRaces();
	document.getElementById('elf-selection-card').classList.add('selected-card');
	myRace = races.elf;
}

function becomeHalfling(){
	deselectRaces();
	document.getElementById('halfling-selection-card').classList.add('selected-card');
	myRace = races.halfling;
}

function becomeHuman(){
	deselectRaces();
	document.getElementById('human-selection-card').classList.add('selected-card');
	myRace = races.human;
}

function updateBonusLanguages(){
	if (iq > 11){
		document.getElementById('dwarf-bonus-languages').innerHTML = 'and ' + calculateUnsignedMod(wis + wisBonus) + ' bonus languages:<br>Giant<input type="checkbox" name="dwarf-languages" value="giant"> Gnome<input type="checkbox" name="dwarf-languages" value="gnome"> Goblin<input type="checkbox" name="dwarf-languages" value="goblin"> Orc<input type="checkbox" name="dwarf-languages" value="orc"> Terran<input type="checkbox" name="dwarf-languages" value="terran"> Undercommon<input type="checkbox" name="dwarf-languages" value="undercommon">';
	}
	else{
		document.getElementById('dwarf-bonus-languages').innerHTML = "";
	}
}
								
//--- Classes Section ------
var classes = {cleric: 1, fighter: 2, rogue: 3, wizard: 4};
var myClass;

function deselectClasses(){
	document.getElementById('cleric-selection-card').classList.remove('selected-card');
	document.getElementById('fighter-selection-card').classList.remove('selected-card');
	document.getElementById('rogue-selection-card').classList.remove('selected-card');
	document.getElementById('wizard-selection-card').classList.remove('selected-card');
}

function becomeCleric(){
	deselectClasses();
	document.getElementById('cleric-selection-card').classList.add('selected-card');
	myClass = classes.cleric;
}

function becomeFighter(){
	deselectClasses();
	document.getElementById('fighter-selection-card').classList.add('selected-card');
	myClass = classes.fighter;
}

function becomeRogue(){
	deselectClasses();
	document.getElementById('rogue-selection-card').classList.add('selected-card');
	myClass = classes.rogue;
}

function becomeWizard(){
	deselectClasses();
	document.getElementById('wizard-selection-card').classList.add('selected-card');
	myClass = classes.wizard;
}

//Spell Section ---------------------------------------
var MaxSpells = 0;
var School = {abjuration: 1, conjuration: 2, divination: 3, enchantment: 4, evocation : 5, necromancy: 6, transmutation: 7, universal: 8};
var specialtySchool = School.divination;
var oppositionSchools = [School.abjuration, School.conjuration];


function setupWizardSpells(){
	if (iq > 10){
		MaxSpells = 3 + iq;
	}
	displayCantrips();
}

var Spell = function (name, school, description){
	this.name = name;
	this.school = school;
	this.description = description;
}

var cantrips = [
	new Spell("Resistance", School.abjuration, "+1 to saving throws for 1 minute"),
	new Spell("Acid Splash", School.conjuration, "+1 to saving throws for 1 minute"),
	new Spell("Detect Magic", School.divination, "+1 to saving throws for 1 minute"),
	new Spell("Read Magic", School.divination, "+1 to saving throws for 1 minute"),
	new Spell("Daze", School.enchantment, "+1 to saving throws for 1 minute"),
	new Spell("Dancing Lights", School.evocation, "+1 to saving throws for 1 minute"),
	new Spell("Ghost Sound", School.illusion, "+1 to saving throws for 1 minute"),
	new Spell("Disrupt Undead", School.necromancy, "+1 to saving throws for 1 minute"),
	new Spell("Mage Hand", School.transmutation, "+1 to saving throws for 1 minute"),
	new Spell("Prestidigitation", School.universal, "+1 to saving throws for 1 minute")
	];

function displayCantrips(){	
	for (var c in cantrips) {
		if (cantrips[c].school != oppositionSchools[0] && cantrips[c].school != oppositionSchools[1]){
			var newElement = document.createElement('div');
			newElement.className = "spell-card";
			newElement.innerHTML = '<div class="spell-title">' + cantrips[c].name + '</div>';
			document.getElementById('cantrips').appendChild(newElement);
		}
	} 
}
