//--- Steps Section ------
var step = 0;

function hideAllSteps(){
	document.getElementById('step-one').style.display = 'none';
	document.getElementById('step-two').style.display = 'none';
	document.getElementById('step-three').style.display = 'none';
	document.getElementById('step-four').style.display = 'none';
	document.getElementById('step-five').style.display = 'none';
	document.getElementById('step-six').style.display = 'none';
} 

function showCurrentStep(){
	switch (step) {
		case 0:
            document.getElementById('previous').classList.add('disabled');
			document.getElementById('step-one').style.display = "block";
			document.getElementById('stepper-one').classList.add('active-step');
			document.getElementById('stepper-two').classList.add('inactive');
			document.getElementById('stepper-two').classList.remove('active-step');
			break;
		case 1:
            document.getElementById('previous').classList.remove('disabled');
			document.getElementById('step-two').style.display = "block";
			document.getElementById('race-selection').style.display = "block";
			document.getElementById('class-selection').style.display = "none";
			document.getElementById('race-content').style.display = "block";
			document.getElementById('class-content').style.display = "none";
			document.getElementById('stepper-one').classList.remove('active-step');
			document.getElementById('stepper-one').classList.add('completed-step');
			document.getElementById('stepper-two').classList.remove('inactive');
			document.getElementById('stepper-two').classList.add('active-step');
			document.getElementById('stepper-three').classList.add('inactive');
			document.getElementById('stepper-three').classList.remove('active-step');
			break;
		case 2:
			document.getElementById('race-selection').style.display = "none";
			document.getElementById('class-selection').style.display = "block";
			document.getElementById('race-content').style.display = "none";
			document.getElementById('class-content').style.display = "block";
			document.getElementById('step-two').style.display = "block";
			document.getElementById('stepper-two').classList.remove('active-step');
			document.getElementById('stepper-two').classList.add('completed-step');
			document.getElementById('stepper-three').classList.remove('inactive');
			document.getElementById('stepper-three').classList.add('active-step');
			document.getElementById('stepper-four').classList.add('inactive');
			document.getElementById('stepper-four').classList.remove('active-step');
			break;
		case 3:
			document.getElementById('step-four').style.display = "block";
			document.getElementById('stepper-three').classList.remove('active-step');
			document.getElementById('stepper-three').classList.add('completed-step');
			document.getElementById('stepper-four').classList.remove('inactive');
			document.getElementById('stepper-four').classList.add('active-step');
			document.getElementById('stepper-five').classList.add('inactive');
			document.getElementById('stepper-five').classList.remove('active-step');
			break;
		case 4:
			document.getElementById('step-five').style.display = "block";
			document.getElementById('stepper-four').classList.remove('active-step');
			document.getElementById('stepper-four').classList.add('completed-step');
			document.getElementById('stepper-five').classList.remove('inactive');
			document.getElementById('stepper-five').classList.add('active-step');
			document.getElementById('stepper-six').classList.add('inactive');
			document.getElementById('stepper-six').classList.remove('active-step');
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

function next() {
    if (step == 0 && currCost > maxCost){
        return;
    }
	step++;
	hideAllSteps();
    showCurrentStep();
    scroll(0,0);
 }

function previous() {
    if (step > 0){
	step--;
	hideAllSteps();
    showCurrentStep();
    scroll(0,0);
    }
}
 
//--- Abilities Section --------
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
	if (mod > 0) {
		mod = "+" + mod;
	}
	return mod;
}

function calculateUnsignedMod(score){
	return mod = Math.floor((score - 10) / 2);
}

function setupAbilities() {
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
	updateBonusLanguages(myRace);
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
		document.getElementById('continue').classList.remove('disabled');
	}
    else if (currCost > maxCost){
	    document.getElementById("total-cost").style.color = "red";
		document.getElementById('continue').classList.add('disabled');

	}
    else{
	    document.getElementById("total-cost").style.color = "green";	document.getElementById('continue').classList.remove('disabled');
	}
	document.getElementById("total-cost").innerHTML = "Total Cost: " + currCost;
}

//--- Races Section --------
var myRace;

//--- --- Trait SubSection ------
var traitTypes = {offensive: 1, defensive: 2, magical: 3, skill: 4}

var racialTrait = function (name, type, description){
	this.name = name;
	this.type = type;
	this.description = description;
}

dwarfDescription = "Dwarves are a stoic but stern race, ensconced in cities carved from the hearts of mountains and fiercely determined to repel the depredations of savage races like orcs and goblins. More than any other race, dwarves have acquired a reputation as dour and humorless artisans of the earth. It could be said that their history shapes the dark disposition of many dwarves, for they reside in high mountains and dangerous realms below the earth, constantly at war with giants, goblins, and other such horrors.";

elfDescription = "The long-lived elves are children of the natural world, similar in many superficial ways to fey creatures, though with key differences. While fey are truly linked to the flora and fauna of their homes, existing as the nearly immortal voices and guardians of the wilderness, elves are instead mortals who are in tune with the natural world around them. Elves seek to live in balance with the wild and understand it better than most other mortals. Some of this understanding is mystical, but an equal part comes from the elves' long lifespans, which in turn gives them long-ranging outlooks. Elves can expect to remain active in the same locale for centuries. By necessity, they must learn to maintain sustainable lifestyles, and this is most easily done when they work with nature, rather than attempting to bend it to their will.";

halflingDescription = "Optimistic and cheerful by nature, blessed with uncanny luck, and driven by a powerful wanderlust, halflings make up for their short stature with an abundance of bravado and curiosity. At once excitable and easy-going, halflings like to keep an even temper and a steady eye on opportunity, and are not as prone to violent or emotional outbursts as some of the more volatile races. Even in the jaws of catastrophe, halflings almost never lose their sense of humor. Their ability to find humor in the absurd, no matter how dire the situation, often allows halflings to distance themselves ever so slightly from the dangers that surround them. This sense of detachment can also help shield them from terrors that might immobilize their allies.";

humanDescription = "Humans possess exceptional drive and a great capacity to endure and expand, and as such are currently the dominant race in the world. Their empires and nations are vast, sprawling things, and the citizens of these societies carve names for themselves with the strength of their sword arms and the power of their spells. Humanity is best characterized by its tumultuousness and diversity, and human cultures run the gamut from savage but honorable tribes to decadent, devil-worshiping noble families in the most cosmopolitan cities. Humans' curiosity and ambition often triumph over their predilection for a sedentary lifestyle, and many leave their homes to explore the innumerable forgotten corners of the world or lead mighty armies to conquer their neighbors, simply because they can.";

var dwarfTraits = [
    new racialTrait("Hatred", traitTypes.offensive, "+1 on attack rolls against orcs and goblinoids"),
    new racialTrait("Defensive Training", traitTypes.defensive, "+4 to armour class against giants"),
    new racialTrait("Hardy", traitTypes.defensive, "+2 on saving throws against poison, spells, and spell-like abilities"),
    new racialTrait("Stability", traitTypes.defensive, "+4 to  combat manuevour defense against bull rush and trip attempts"),
    new racialTrait("Greed", traitTypes.skill, "+2 bonus on Appraise checks on nonmagical goods containing precious metals or gemstones"),
    new racialTrait("Stonecunning", traitTypes.skill, "+2 bonus on Perception checks to notice unusual stonework")
];
var elfTraits = [
    new racialTrait("Elven Immunities", traitTypes.defensive, "Immune to magic sleep effects <br>&nbsp;+2 on saving throws against enchantments"),
    new racialTrait("Elven Magic", traitTypes.magical, "+2 on caster-level checks to overcome spell resistance <br>&nbsp;+2 on Spellcraft checks made to identify magical items"),
    new racialTrait("Keen Senses", traitTypes.skill, "+2 on perception checks"),
];
var halflingTraits = [
    new racialTrait("Fearless", traitTypes.offensive, "+2 on saving throws against fear"),
    new racialTrait("Halfling Luck", traitTypes.offensive, "+1 on all saving throws"),
    new racialTrait("Sure-Footed", traitTypes.skill, "+2 on Acrobatics and Climb checks"),
    new racialTrait("Keen Senses", traitTypes.skill, "+2 on perception checks")
];
var humanTraits = [
    new racialTrait("Bonus Feat", traitTypes.skill, "Select one extra feat at level one"),
    new racialTrait("Skilled", traitTypes.skill, "Gain an additional skill rank at each level")
];

var dwarf = {
    name: "Dwarf",
    description: dwarfDescription,
    abilityScores: "+2 Constitution, +2 Wisdom, and -2 Charisma",
    size: "Medium",
    speed: "20 feet",
    senses: "Darkvision 60 feet",
    languages: "Common, Dwarven",
    bonusLanguages: ["Giant", "Gnome", "Goblin", "Orc", "Terran", "Undercommon"],
    traits: dwarfTraits
};

var elf = {
    name: "Elf",
    description: elfDescription,
    abilityScores: "+2 Dexterity, +2 Intelligence, and -2 Constitution",
    size: "Medium",
    speed: "30 feet",
    senses: "Low-light vision",
    languages: "Common, Elven",
    bonusLanguages: ["Celestial", "Draconic", "Gnoll", "Gnome", "Goblin", "Orc", "Sylvan"],
    traits: elfTraits
};

var halfling = {
    name: "Halfling",
    description: halflingDescription,
    abilityScores: "+2 Constitution, +2 Wisdom, and -2 Charisma",
    size: "Small",
    speed: "20 feet",
    senses: "Standard",
    languages: "Common, Halfling",
    bonusLanguages: ["Dwarven", "Elven", "Gnome", "Goblin"],
    traits: halflingTraits
};

var customizableAbilityScore = '+2 to any one ability score <div class="ghost-button flex-wrap"><a id="str-flex" onclick="flexStr();">Strength</a><a id="dex-flex" onclick="flexDex();">Dexterity</a><a id="con-flex" onclick="flexCon();">Constitution</a><a id="iq-flex" onclick="flexIq();">Intelligence</a><a id="wis-flex" onclick="flexWis();">Wisdom</a><a id="cha-flex" onclick="flexCha();">Charisma</a></div>'

var human = {
    name: "Human",
    description: humanDescription,
    abilityScores: customizableAbilityScore,
    size: "Medium",
    speed: "30 feet",
    senses: "Standard",
    languages: "Common",
    bonusLanguages: ["Abyssal", "Aklo", "Auran", "Celestial", "Common", "Draconic", "Dwarven", "Elven", "Giant", "Gnome", "Goblin", "Gnoll", "Halfling", "Ignan", "Infernal", "Orc", "Sylvan", "Terran", "Undercommon"],
    traits: humanTraits
};

function displayRaceDescription(name, description){
    document.getElementById('race-name').innerHTML = name;
    document.getElementById('race-description').innerHTML = description;
}

function displayStandardRacialTraits(race){
	document.getElementById('racial-ability-score').innerHTML = race.abilityScores;
	document.getElementById('racial-size').innerHTML = race.size;
	document.getElementById('racial-speed').innerHTML = race.speed;
	document.getElementById('racial-senses').innerHTML = race.senses;
}

function deselectRaces(){
	document.getElementById('dwarf-selection-card').classList.remove('selected-card');
	document.getElementById('elf-selection-card').classList.remove('selected-card');
	document.getElementById('halfling-selection-card').classList.remove('selected-card');
	document.getElementById('human-selection-card').classList.remove('selected-card');
}

function changeRace(raceCard, race){
    deselectRaces();
	document.getElementById(raceCard).classList.add('selected-card');
    displayRacialTraits(race.traits);
    displayStandardRacialTraits(race);
    displayRaceDescription(race.name, race.description);
    myRace = race;
    updateBonusLanguages(race);
}

function updateRacialAbilityBonuses(s, d, co, i, w, ch){
    racialStr = s;
    racialDex = d;
    racialCon = co;
    racialIq = i;
    racialWis = w;
    racialCha = ch;
    
    updateStr();
    updateDex();
    updateCon();
    updateWis();
    updateIq();
    updateCha();
}

function becomeDwarf(){
    changeRace('dwarf-selection-card', dwarf);
    updateRacialAbilityBonuses(0, 0, 2, 0, 2, -2);
}

function becomeElf(){
    changeRace('elf-selection-card', elf);
    updateRacialAbilityBonuses(0, 2, -2, 2, 0, 0);
}

function becomeHalfling(){
    changeRace('halfling-selection-card', halfling);
    updateRacialAbilityBonuses(-2, 2, 0, 0, 0, 2);
}

function becomeHuman(){
    changeRace('human-selection-card', human);
    updateRacialAbilityBonuses(0, 0, 0, 0, 0, 0);
}

function updateBonusLanguages(race){
    var languages = race.languages;
	if ((iq + racialIq) > 11){
        languages += ' and ' + calculateUnsignedMod(iq + racialIq) + ' bonus languages:<br>';
        for (var lang in race.bonusLanguages) {
            languages += race.bonusLanguages[lang] + '<input type="checkbox" name="bonus-languages" value=race.language[lang]>&nbsp';
        }
	}
    document.getElementById('racial-languages').innerHTML = languages;
}

function displayRacialTraits(traits){	
    document.getElementById('offensive-traits').innerHTML= "";
    document.getElementById('defensive-traits').innerHTML= "";
    document.getElementById('magical-traits').innerHTML= "";
    document.getElementById('skill-traits').innerHTML= "";
    
	for (var t in traits) {
        var newElement = document.createElement('div');
        newElement.className = "trait-row";
        newElement.innerHTML = "<b>" + traits[t].name + ":</b> &nbsp;" + traits[t].description;
		if (traits[t].type == traitTypes.offensive){
			document.getElementById('offensive-traits').appendChild(newElement);
		}
        else if (traits[t].type == traitTypes.defensive){
			document.getElementById('defensive-traits').appendChild(newElement);
        }
        else if (traits[t].type == traitTypes.magical){
			document.getElementById('magical-traits').appendChild(newElement);
        }
        else if (traits[t].type == traitTypes.skill){
			document.getElementById('skill-traits').appendChild(newElement);
        }
	} 
    
    if (document.getElementById('offensive-traits').innerHTML == ""){
        document.getElementById('offensive-traits-container').style.display = 'none';
    } else {
        document.getElementById('offensive-traits-container').style.display = 'block';
    }
    if (document.getElementById('defensive-traits').innerHTML == ""){
        document.getElementById('defensive-traits-container').style.display = 'none';
    } else {
        document.getElementById('defensive-traits-container').style.display = 'block';
    }
    if (document.getElementById('magical-traits').innerHTML == ""){
        document.getElementById('magical-traits-container').style.display = 'none';
    } else {
        document.getElementById('magical-traits-container').style.display = 'block';
    }
    if (document.getElementById('skill-traits').innerHTML == ""){
        document.getElementById('skill-traits-container').style.display = 'none';
    } else {
        document.getElementById('skill-traits-container').style.display = 'block';
    }
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

//---Skill Section ------
var ability = {str: 1, dex: 2, con: 3, iq: 4, wis: 5, cha: 6};

var skill = function(name, abilityScore, trainedOnly) {	//add description argument
	this.name = name;
	this.abilityScore = abilityScore;
	this.trainedOnly = trainedOnly;
	this.trained = false;
}

var wizardSkills =[];
var clericSkills =[];
var rogueSkills =[];
var fighterSkills =[];

var acrobatics = new skill("Acrobatics", ability.dex, false);
var appraise = new skill("Appraise", ability.dex, false);
var bluff = new skill("Acrobatics", ability.dex, false);
var climb = new skill("Acrobatics", ability.dex, false);
var craft = new skill("Acrobatics", ability.dex, false);


//--- Equipment Section ------

var weapon = function(name, price, melee, twoHand, light, damageLarge, damageSmall, crit, type, weight){
	this.name = name;
	this.price = price;
	this.melee = melee;
	this.twoHand = twoHand;
	this.damageLarge = damageLarge;
	this.damageSmall = damageSmall;
	this.crit = crit;
	this.weight = weight;
}

//simple light
var dagger = new weapon("dagger", 2, true, false, true, "1d4", "1d3", "19-20 x2", "P", 1);
var mace = new weapon("mace", 5, true, false, true, "1d6", "1d4", "x2", "B", 4);
//simple one hand
var club = new weapon("club", 0, true, false, false, "1d6", "1d4", "x2", "B", 6);
var morningstar = new weapon("morningstar", 8, true, false, false, "1d8", "1d6", "x2", "B", 4);
//simple two hand
var quarterstaff = new weapon("quarterstaff", 0, true, true, false, "1d6", "1d4", "x2", "B", 4);
var spear = new weapon("spear", 2, true, true, false, "1d8", "1d6", "x3", "P", 6);
//simple ranged
var lightCrossbow = new weapon("light crossbow", 35, false, true, false, "1d10", "1d8", "19-20 x2", "P", 8);
var heavyCrossbow = new weapon("heavy crossbow", 50, false, true, false, "1d8", "1d6", "19-20 x2", "P", 4);

//martial light
var shortSword = new weapon("short sword", 10, true, false, true, "1d6", "1d4", "19-20 x2", "P", 2);
//martial one hand
var battleaxe;
var longsword;
var rapier;
var scimitar;
//martial two hand
var falchion;
var greataxe;
var greatsword;
var scythe;
//martial ranged
var shortbow;
var longbow;
//exotic
var dwarvenWaraxe;
var elevenCurveBlade;
var handCrossbow;

var simpleWeapons = [dagger, mace, club, morningstar, quarterstaff, spear, lightCrossbow, heavyCrossbow];
var martialWeapons = [shortSword, battleaxe, longsword, rapier, scimitar, falchion, greataxe, greatsword, scythe, shortbow, longbow];

var wizardWeapons = [club, dagger, heavyCrossbow, lightCrossbow, quarterstaff];
var clericWeapons = simpleWeapons;
var rogueWeapons = simpleWeapons.concat([shortSword, rapier, shortbow, handCrossbow])
var fighterWeapons = simpleWeapons.concat(martialWeapons);

var towerShield;

var lightArmor = [];
var mediumArmor = [];
var heavyArmor = [];
var shields = [];

var wizardArmor;
var rogueArmor = lightArmor;
var clericArmor = lightArmor.concat(mediumArmor);
var fighterArmor = lightArmor.concat(mediumArmor, heavyArmor);
								
//--- Classes Section ------
var classes = {cleric: 1, fighter: 2, rogue: 3, wizard: 4};
var myClass;

var characterClass = function(name, hp, bab, fort, ref, will, skillPoints, classSkills, weapons, armor, shield, wealth){
	this.name = name;
	this.hp = hp;
	this.bab = bab;
	this.fort = fort;
	this.ref = ref;
	this.will = will;
	this.skillPoints = skillPoints;
	this.classSkills = classSkills;
	this.weapons = weapons;
	this.armor = armor;
	this.shield = shield;
	this.wealth = wealth;
}

var wizard = new characterClass("Wizard", 6, 0, 0, 0, 2, 2, wizardSkills, wizardWeapons, [], [], 70);
wizard.description = "";

var cleric = new characterClass("Cleric", 8, 0, 0, 0, 2, 2, clericSkills, clericWeapons, clericArmor, shields, 70);
cleric.description = "";

var rogue = new characterClass("Rogue", 8, 0, 0, 2, 0, 8, rogueSkills, rogueWeapons, rogueArmor, shields, 70);
rogue.description = "";

var fighter = new characterClass("Fighter", 10, 1, 2, 0, 0, 2, fighterSkills, fighterWeapons, fighterArmor, shields.concat([towerShield]), 175);
fighter.description = "";

function deselectClasses(){
	document.getElementById('cleric-selection-card').classList.remove('selected-card');
	document.getElementById('fighter-selection-card').classList.remove('selected-card');
	document.getElementById('rogue-selection-card').classList.remove('selected-card');
	document.getElementById('wizard-selection-card').classList.remove('selected-card');
}

function changeClass(classCard, newClass){
    deselectRaces();
	document.getElementById(classCard).classList.add('selected-card');
    displayClassDescription(newClass.name, newClass.description);
    myClass = race;
}

function becomeCleric(){
	changeClass('cleric-selection-card', wizard);
}

function becomeFighter(){
	changeClass('fighter-selection-card', cleric);
}

function becomeRogue(){
	changeClass('rogue-selection-card', rogue);
}

function becomeWizard(){
	changeClass('wizard-selection-card', wizard);
}
