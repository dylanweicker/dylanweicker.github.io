//--- Steps Section ------
var step = 0;
var substep = 0;
var steps = ['step-one', 'step-two', 'step-three', 'step-four', 'step-five', 'step-six'];
var steppers = ["stepper-one", "stepper-two", "stepper-three", "stepper-four", "stepper-five", "stepper-six"];
var substeps = [['abilities-page-one', 'abilities-page-two', 'abilities-page-three', 'abilities-page-four'], ['race-page-one', 'race-page-two']];

function hideAllSteps(){
    for (var i = 0; i < steps.length; i++){
	   document.getElementById(steps[i]).style.display = 'none';
    }
}

function hideAllSubsteps(){
    for (var i = 0; i < substeps[step].length; i ++){
	   document.getElementById(substeps[step][i]).style.display = 'none';
    }
}

function displaySubstep(s, ss){
    step = s;
    substep = ss;
    var id = substeps[s][ss];
    hideAllSubsteps();
	document.getElementById(id).style.display = 'block';
    scroll(0,120);
}

function showCurrentStep(){
    //update stepper
    for (var i  = 0; i < steppers.length; i++){
        if (i < step){
            document.getElementById(steppers[i]).classList.add('completed-step'); 
			document.getElementById(steppers[i]).classList.remove('active-step');
			document.getElementById(steppers[i]).classList.remove('inactive');
        }
        if (i == step){
            document.getElementById(steppers[i]).classList.add('active-step'); 
			document.getElementById(steppers[i]).classList.remove('inactive');
			document.getElementById(steppers[i]).classList.remove('completed-step');
        }
        if (i > step){
            document.getElementById(steppers[i]).classList.add('inactive'); 
			document.getElementById(steppers[i]).classList.remove('active-step');
			document.getElementById(steppers[i]).classList.remove('completed-step');
        }
    }
    //flip to current step
    hideAllSteps();
    document.getElementById(steps[step]).style.display = "block";
    
    //flip to current substep
    displaySubstep(step, substep);
}

function showCurrentSubstep(){
	switch (substep) {
		case 1:
			document.getElementById('abilities-page-one').style.display = "block";
			document.getElementById('abilities-page-two').style.display = "none";
            break;
        case 2:
			document.getElementById('abilities-page-one').style.display = "none";
			document.getElementById('abilities-page-two').style.display = "block";
			document.getElementById('abilities-page-three').style.display = "none";
            break;
        case 3:
			document.getElementById('abilities-page-two').style.display = "none";
			document.getElementById('abilities-page-three').style.display = "block";
	}
}

function next() {
    ///if substep is final substep in step
    if (substep == substeps[step].length-1){
        if (step == 0 && currCost > maxCost){
            return;
        }
        //increment the step and reset the substep
        step++;
        substep = 0;
        hideAllSteps();
        showCurrentStep();
        scroll(0,120);
    }
    else {
        substep++;
    }
    displaySubstep(step, substep);
 }

function previous() {
    
    if (substep == 1){
        if (step > 0){
        step--;
        hideAllSteps();
        showCurrentStep();
        scroll(0,0);
        }
    }
    else substep--;
    showCurrentSubstep();
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


function  setMaxCost(cost, button){
    var buttons = document.getElementsByClassName('ability-score-button');
    for (var i = 0; i < buttons.length; ++i) {
        var item = buttons[i];
        item.classList.remove('selected');
    }
    document.getElementById(button).classList.add('selected');
    maxCost = cost;
	updatePointsSpent();
}

function setupAbilities() {
	hideAllSteps();
    hideAllSubsteps();
	document.getElementById('step-one').style.display = "block";
	document.getElementById('abilities-page-one').style.display = "block";
    displayStrInfo();
    setMaxCost(15, 'standard-fantasy');
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

//--- Races Section --------
var myRace;
/*
var dwarfDescription = "Dwarves are a stoic but stern race, ensconced in cities carved from the hearts of mountains and fiercely determined to repel the depredations of savage races like orcs and goblins. More than any other race, dwarves have acquired a reputation as dour and humorless artisans of the earth. It could be said that their history shapes the dark disposition of many dwarves, for they reside in high mountains and dangerous realms below the earth, constantly at war with giants, goblins, and other such horrors.";
var elfDescription = "The long-lived elves are children of the natural world, similar in many superficial ways to fey creatures, though with key differences. While fey are truly linked to the flora and fauna of their homes, existing as the nearly immortal voices and guardians of the wilderness, elves are instead mortals who are in tune with the natural world around them. Elves seek to live in balance with the wild and understand it better than most other mortals. Some of this understanding is mystical, but an equal part comes from the elves' long lifespans, which in turn gives them long-ranging outlooks. Elves can expect to remain active in the same locale for centuries. By necessity, they must learn to maintain sustainable lifestyles, and this is most easily done when they work with nature, rather than attempting to bend it to their will.";
var halflingDescription = "Optimistic and cheerful by nature, blessed with uncanny luck, and driven by a powerful wanderlust, halflings make up for their short stature with an abundance of bravado and curiosity. At once excitable and easy-going, halflings like to keep an even temper and a steady eye on opportunity, and are not as prone to violent or emotional outbursts as some of the more volatile races. Even in the jaws of catastrophe, halflings almost never lose their sense of humor. Their ability to find humor in the absurd, no matter how dire the situation, often allows halflings to distance themselves ever so slightly from the dangers that surround them. This sense of detachment can also help shield them from terrors that might immobilize their allies.";
var humanDescription = "Humans possess exceptional drive and a great capacity to endure and expand, and as such are currently the dominant race in the world. Their empires and nations are vast, sprawling things, and the citizens of these societies carve names for themselves with the strength of their sword arms and the power of their spells. Humanity is best characterized by its tumultuousness and diversity, and human cultures run the gamut from savage but honorable tribes to decadent, devil-worshiping noble families in the most cosmopolitan cities. Humans' curiosity and ambition often triumph over their predilection for a sedentary lifestyle, and many leave their homes to explore the innumerable forgotten corners of the world or lead mighty armies to conquer their neighbors, simply because they can.";
*/

var dwarfDescription = "dwarf-description";
var elfDescription = "elf-description";
var humanDescription = "human-description";
var halflingDescription = "halfling-description";
var allRaceDescriptions = [dwarfDescription, elfDescription ,humanDescription, halflingDescription];


//--- --- Trait SubSection ------
var traitTypes = {offensive: 1, defensive: 2, magical: 3, skill: 4}
var racialTrait = function (name, type, description){
	this.name = name;
	this.type = type;
	this.description = description;
}
//create traits
var hatred = new racialTrait("Hatred", traitTypes.offensive, "+1 on attack rolls against orcs and goblinoids");
var defensiveTraining = new racialTrait("Defensive Training", traitTypes.defensive, "+4 to armour class against giants");
var hardy = new racialTrait("Hardy", traitTypes.defensive, "+2 on saving throws against poison, spells, and spell-like abilities");
var stability = new racialTrait("Stability", traitTypes.defensive, "+4 to  combat manuevour defense against bull rush and trip attempts");
var greed = new racialTrait("Greed", traitTypes.skill, "+2 bonus on Appraise checks on nonmagical goods containing precious metals or gemstones");
var stonecunning = new racialTrait("Stonecunning", traitTypes.skill, "+2 bonus on Perception checks to notice unusual stonework");
var elvenImmunities =  new racialTrait("Elven Immunities", traitTypes.defensive, "Immune to magic sleep effects <br>&nbsp;+2 on saving throws against enchantments");
var elvenMagic = new racialTrait("Elven Magic", traitTypes.magical, "+2 on caster-level checks to overcome spell resistance <br>&nbsp;+2 on Spellcraft checks made to identify magical items");
var keenSenses = new racialTrait("Keen Senses", traitTypes.skill, "+2 on perception checks");
var fearless = new racialTrait("Fearless", traitTypes.offensive, "+2 on saving throws against fear");
var halflingLuck = new racialTrait("Halfling Luck", traitTypes.offensive, "+1 on all saving throws");
var sureFooted = new racialTrait("Sure-Footed", traitTypes.skill, "+2 on Acrobatics and Climb checks");
var bonusFeat = new racialTrait("Bonus Feat", traitTypes.skill, "Select one extra feat at level one");
var skilled = new racialTrait("Skilled", traitTypes.skill, "Gain an additional skill rank at each level");

var dwarf = {
    name: "Dwarf",
    description: dwarfDescription,
    abilityScores: "+2 Constitution, +2 Wisdom, and -2 Charisma",
    size: "Medium",
    speed: "20 feet",
    senses: "Darkvision 60 feet",
    languages: "Common, Dwarven",
    bonusLanguages: ["Giant", "Gnome", "Goblin", "Orc", "Terran", "Undercommon"],
    traits: [hatred, defensiveTraining, hardy, stability, greed, stonecunning]
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
    traits: [elvenImmunities, elvenMagic, keenSenses]
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
    traits: [fearless, halflingLuck, sureFooted, keenSenses]
};

var customizableAbilityScore = '+2 to any one ability score <div class="ghost-button ghost-button-small flex-wrap"><a id="str-flex" onclick="flexStr();">Strength</a><a id="dex-flex" onclick="flexDex();">Dexterity</a><a id="con-flex" onclick="flexCon();">Constitution</a><a id="iq-flex" onclick="flexIq();">Intelligence</a><a id="wis-flex" onclick="flexWis();">Wisdom</a><a id="cha-flex" onclick="flexCha();">Charisma</a></div>'

var human = {
    name: "Human",
    description: humanDescription,
    abilityScores: customizableAbilityScore,
    size: "Medium",
    speed: "30 feet",
    senses: "Standard",
    languages: "Common",
    bonusLanguages: ["Abyssal", "Aklo", "Auran", "Celestial", "Common", "Draconic", "Dwarven", "Elven", "Giant", "Gnome", "Goblin", "Gnoll", "Halfling", "Ignan", "Infernal", "Orc", "Sylvan", "Terran", "Undercommon"],
    traits: [bonusFeat, skilled]
};

function displayRaceDescription(name, description){
    for (var i = 0; i < allRaceDescriptions.length; i++){
        document.getElementById(allRaceDescriptions[i]).classList.add('hidden');
    }
    var raceName = document.getElementsByClassName('race-name');
    for (var i = 0; i < raceName.length; ++i) {
        var item = raceName[i];
        item.innerHTML = name;
    }
    document.getElementById(description).classList.remove('hidden');
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
    updateLanguages(race);
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



var myRacialLanguages= ["Common"];
var myBonusLanguages = [];

var Draconic = "Draconic";

function updateLanguages(race){
    myRacialLanguages = race.languages;
    var languages = myRacialLanguages;
    displayLanguages();
	if ((iq + racialIq) > 11){
        languages += ' and ' + calculateUnsignedMod(iq + racialIq) + ' bonus languages: <div class="flex-wrap ghost-button" style="justify-content: flex-start;">';
        for (var lang in race.bonusLanguages) {
            var language = race.bonusLanguages[lang].trim();
            var button = '<a class="language-button" style="width: 146px; flex: none; padding-left: 0; padding-right: 0; text-align:center;" onclick="addOrRemoveLanguage("' + language +'")">' + race.bonusLanguages[lang] + '</a>';
            languages += button;
        }
        languages += '</div> Known bug: Bonus languages are not currently supported by this tool. Make a note of which '  + calculateUnsignedMod(iq + racialIq) + ' bonus languages you would like your character to know.';
	}
    document.getElementById('racial-languages').innerHTML = languages;
}

function addLanguage(language){
    var languageButtons = document.getElementsByClassName('language-button');
    if (myBonusLanguages.length < calculateUnsignedMod(iq + racialIq)){
        myBonusLanguages.concat(language);
        for (var i = 0; i < languageButtons.length; ++i) {
            var button = languageButtons[i];
            if (!button.innerHTML == language){
                button.classList.add('selected');
            }
        }
    }
    if (myBonusLanguages.length >= calculateUnsignedMod(iq + racialIq)){
        for (var i = 0; i < languageButtons.length; ++i) {
            var button = languageButtons[i];
            if (!button.classList.contains('selected')){
                button.classList.add('disabled');
            }
        }
    }
}

function removeLanguage(language){
    for (var i=myBonusLanguages.length-1; i>=0; i--) {
    if (array[i] === language) {
        array.splice(i, 1);
        break;
        }
    }
    var languageButtons = document.getElementsByClassName('language-button');
    for (var i = 0; i < languageButtons.length; ++i) {
        var button = languageButtons[i];
        if (!button.classList.contains('disabled')){
            button.classList.remove('disabled');
        }
        if (!button.innerHTML == language){
            button.classList.remove('selected');
        }
    }
}

function displayLanguages(){
    var languages = document.getElementById('my-languages');
    var allMyLanguages = myRacialLanguages.concat(myBonusLanguages);
    languages.innerHTML = allMyLanguages.toString();
}

function addOrRemoveLanguage(language) {
    if (myBonusLanguages.contains(language)) {
        removeLanguage(language);
    }
    else{
        addLanguage(language);
    }
    displayLanguages();
}


function displayRacialTraits(traits){
    document.getElementById('offensive-traits').innerHTML= "";
    document.getElementById('defensive-traits').innerHTML= "";
    document.getElementById('magical-traits').innerHTML= "";
    document.getElementById('skill-traits').innerHTML= "";

    var listOfTraits = [];

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

        listOfTraits.push(" " + traits[t].name);
	}

    document.getElementById('race-traits').innerHTML= listOfTraits.toString();

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
    this.featBonus = 0;
}

var acrobatics = new skill("Acrobatics", ability.dex, false);
var appraise = new skill("Appraise", ability.iq, false);
var bluff = new skill("Bluff", ability.cha, false);
var climb = new skill("Climb", ability.str, false);
var craft = new skill("Craft", ability.iq, false);

var wizardSkills =[appraise, craft];
var clericSkills =[appraise, craft];
var rogueSkills =[acrobatics, appraise, bluff, climb, craft];
var fighterSkills =[appraise, climb];


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
var myClass;

wizardDescription = "These shrewd magic-users seek, collect, and covet esoteric knowledge, drawing on cultic arts to work wonders beyond the abilities of mere mortals. While some might choose a particular field of magical study and become masters of such powers, others embrace versatility, reveling in the unbounded wonders of all magic. In either case, wizards prove a cunning and potent lot, capable of smiting their foes, empowering their allies, and shaping the world to their every desire.";
clericDescription = "More than capable of upholding the honor of their deities in battle, clerics often prove stalwart and capable combatants. Their true strength lies in their capability to draw upon the power of their deities, whether to increase their own and their allies' prowess in battle, to vex their foes with divine magic, or to lend healing to companions in need. As their powers are influenced by their faith, all clerics must focus their worship upon a divine source.";
rogueDescription = "Rogues excel at moving about unseen and catching foes unaware, and tend to avoid head-to-head combat. Their varied skills and abilities allow them to be highly versatile, with great variations in expertise existing between different rogues. Most, however, excel in overcoming hindrances of all types, from unlocking doors and disarming traps to outwitting magical hazards and conning dull-witted opponents.";
fighterDescription = "Lords of the battlefield, fighters are a disparate lot, training with many weapons or just one, perfecting the uses of armor, learning the fighting techniques of exotic masters, and studying the art of combat, all to shape themselves into living weapons. Far more than mere thugs, these skilled warriors reveal the true deadliness of their weapons, turning hunks of metal into arms capable of taming kingdoms, slaughtering monsters, and rousing the hearts of armies.";

var characterClass = function(name, description, hp, bab, fort, ref, will, skillRanks, classSkills, weapons, armor, shield, wealth){
	this.name = name;
    this.description = description;
	this.hp = hp;
	this.bab = bab;
	this.fort = fort;
	this.ref = ref;
	this.will = will;
	this.skillRanks = skillRanks;
	this.classSkills = classSkills;
	this.weapons = weapons;
	this.armor = armor;
	this.shield = shield;
	this.wealth = wealth;
}

var wizard = new characterClass("Wizard", wizardDescription, 6, 0, 0, 0, 2, 2, wizardSkills, wizardWeapons, [], [], 70);
var cleric = new characterClass("Cleric", clericDescription, 8, 0, 0, 0, 2, 2, clericSkills, clericWeapons, clericArmor, shields, 140);
var rogue = new characterClass("Rogue", rogueDescription, 8, 0, 0, 2, 0, 8, rogueSkills, rogueWeapons, rogueArmor, shields, 140);
var fighter = new characterClass("Fighter", fighterDescription, 10, 1, 2, 0, 0, 2, fighterSkills, fighterWeapons, fighterArmor, shields.concat([towerShield]), 175);

function deselectClasses(){
	document.getElementById('cleric-selection-card').classList.remove('selected-card');
	document.getElementById('fighter-selection-card').classList.remove('selected-card');
	document.getElementById('rogue-selection-card').classList.remove('selected-card');
	document.getElementById('wizard-selection-card').classList.remove('selected-card');
}

function displayClassDescription(name, description){
    document.getElementById('class-name').innerHTML = name;
    document.getElementById('class-description').innerHTML = description;
}

function updateFeature(name, innerHtml){
	var listOfElements = document.getElementsByClassName(name);
    for (var i = 0; i < listOfElements.length; ++i) {
        var element = listOfElements[i];
        element.innerHTML = innerHtml;
    }
}

function updateStandardClassFeatures(){
	updateFeature('hp', myClass.hp + calculateUnsignedMod(con + racialCon));
	updateFeature('mab', myClass.bab + calculateUnsignedMod(str + racialStr));
	updateFeature('rab', myClass.bab + calculateUnsignedMod(dex + racialDex));
	updateFeature('wealth', myClass.wealth + " gp");
	updateFeature('ref', myClass.ref + calculateUnsignedMod(dex + racialDex));
	updateFeature('fort', myClass.fort + calculateUnsignedMod(dex + racialCon));
	updateFeature('will', myClass.will + calculateUnsignedMod(dex + racialWis));
	updateFeature('skill-ranks', myClass.skillRanks + calculateUnsignedMod(iq + racialIq));
	updateFeature('class-skills', myClass.classSkills.map(function(elem){return elem.name;}).join(", "));
}

function updateAdvancedClassFeatures(newClass){
	document.getElementById('fighter-traits').style.display = "none";
	document.getElementById('cleric-traits').style.display = "none";
	document.getElementById('wizard-traits').style.display = "none";
	document.getElementById('rogue-traits').style.display = "none";
    switch (newClass){
        case fighter:
            document.getElementById('fighter-traits').style.display = "block";
            break;
        case rogue:
            document.getElementById('rogue-traits').style.display = "block";
            break;
        case cleric:
            document.getElementById('cleric-traits').style.display = "block";
            break;
        case wizard:
            document.getElementById('wizard-traits').style.display = "block";
            break;
    }
}

function changeClass(classCard, newClass){
    deselectClasses();
	document.getElementById(classCard).classList.add('selected-card');
    myClass = newClass;
    displayClassDescription(myClass.name, myClass.description);
    updateStandardClassFeatures();
    updateAdvancedClassFeatures(newClass)
}

function becomeCleric(){
	changeClass('cleric-selection-card', cleric);
}

function becomeFighter(){
	changeClass('fighter-selection-card', fighter);
}

function becomeRogue(){
	changeClass('rogue-selection-card', rogue);
}

function becomeWizard(){
	changeClass('wizard-selection-card', wizard);
}


//FEATS
//Combat feats
var agileManeuvers;
var blindFight;
var combatExpertise;
var combatReflexes;
var dodge;
var pointBlankShot;
var powerAttack;
var throwAnything;
