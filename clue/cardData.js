var cardType = {suspect: 0, weapon: 1, room: 2};

var markerHover = new Image();
markerHover.src = "images/MarkerHover.png";
var markerHoverBack = new Image();
markerHoverBack.src = "images/MarkerHoverBack.png";
var marker1 = new Image();
marker1.src = "images/Marker1.png";
var marker2 = new Image();
marker2.src = "images/Marker2.png";
var marker3 = new Image();
marker3.src = "images/Marker3.png";
var marker4 = new Image();
marker4.src = "images/Marker4.png";
var marker5 = new Image();
marker5.src = "images/Marker5.png";
var marker6 = new Image();
marker6.src = "images/Marker6.png";
var marker7 = new Image();
marker7.src = "images/Marker7.png";
var marker8 = new Image();
marker8.src = "images/Marker8.png";
var marker9 = new Image();
marker9.src = "images/Marker9.png";
var marker10 = new Image();
marker10.src = "images/Marker10.png";
var marker11 = new Image();
marker11.src = "images/Marker11.png";
var marker12 = new Image();
marker12.src = "images/Marker12.png";
var markers = [new Image(), marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8, marker9, marker10, marker11, marker12];

var scarlett = {
    "name": "Druid",
    "cardType": cardType.suspect,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "card": new Image(),
    "tokenImage": new Image(),
    "marker" : 0,
    "x" : 25,
    "y" : 14,
    "room": null
};
scarlett.card.src = "images/druidcard.png";
scarlett.knownImage.src = "images/druidbutton_known.png";
scarlett.unknownImage.src = "images/druidbutton_unknown.png";
scarlett.knownSelectedImage.src = "images/druidbutton_knownselected.png";
scarlett.unknownSelectedImage.src = "images/druidbutton_unknownselected.png";
scarlett.card.src = "images/druidcard.png";
scarlett.tokenImage.src = "images/druidtoken.png";
scarlett.icon.src = "images/DruidIcon.png";

var mustard = {
    "name": "Ranger",
    "cardType": cardType.suspect,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "card": new Image(),
    "tokenImage": new Image(),
    "marker" : 0,
    "x" : 17,
    "y" : 18,
    "room": null
};
mustard.knownImage.src = "images/rangerbutton_known.png";
mustard.unknownImage.src = "images/rangerbutton_unknown.png";
mustard.knownSelectedImage.src = "images/rangerbutton_knownselected.png";
mustard.unknownSelectedImage.src = "images/rangerbutton_unknownselected.png";
mustard.card.src = "images/rangercard.png";
mustard.tokenImage.src = "images/rangertoken.png";
mustard.icon.src = "images/RangerIcon.png";

var green = {
    "name": "Paladin",
    "cardType": cardType.suspect,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "card": new Image(),
    "tokenImage": new Image(),
    "marker" : 0,
    "x" : 6,
    "y" : 2,
    "room": null
};
green.card.src = "images/paladincard.png";
green.knownImage.src = "images/paladinbutton_known.png";
green.unknownImage.src = "images/paladinbutton_unknown.png";
green.knownSelectedImage.src = "images/paladinbutton_knownselected.png";
green.unknownSelectedImage.src = "images/paladinbutton_unknownselected.png";
green.tokenImage.src = "images/paladintoken.png";
green.icon.src = "images/PaladinIcon.png";

var peacock = {
    "name": "Sorcerer",
    "cardType": cardType.suspect,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "card": new Image(),
    "tokenImage": new Image(),
    "marker" : 0,
    "x" : 12,
    "y" : 2,
    "room": null
};
peacock.card.src = "images/sorcerercard.png";
peacock.knownImage.src = "images/sorcererbutton_known.png";
peacock.unknownImage.src = "images/sorcererbutton_unknown.png";
peacock.knownSelectedImage.src = "images/sorcererbutton_knownselected.png";
peacock.unknownSelectedImage.src = "images/sorcererbutton_unknownselected.png";
peacock.tokenImage.src = "images/sorcerertoken.png";
peacock.icon.src = "images/SorcererIcon.png";

var plum = {
    "name": "Warlock",
    "cardType": cardType.suspect,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "card": new Image(),
    "tokenImage": new Image(),
    "marker" : 0,
    "x" : 19,
    "y" : 2,
    "room": null
};
plum.card.src = "images/warlockcard.png";
plum.knownImage.src = "images/warlockbutton_known.png";
plum.unknownImage.src = "images/warlockbutton_unknown.png";
plum.knownSelectedImage.src = "images/warlockbutton_knownselected.png";
plum.unknownSelectedImage.src = "images/warlockbutton_unknownselected.png";
plum.tokenImage.src = "images/warlocktoken.png";
plum.icon.src = "images/WarlockIcon.png";

var white = {
    "name": "Cleric",
    "cardType": cardType.suspect,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "card": new Image(),
    "tokenImage": new Image(),
    "marker" : 0,
    "x" : 1,
    "y" : 13,
    "room": null
};
white.card.src = "images/clericcard.png";
white.knownImage.src = "images/clericbutton_known.png";
white.unknownImage.src = "images/clericbutton_unknown.png";
white.knownSelectedImage.src = "images/clericbutton_knownselected.png";
white.unknownSelectedImage.src = "images/clericbutton_unknownselected.png";
white.tokenImage.src = "images/clerictoken.png";
white.icon.src = "images/ClericIcon.png";


//weapons
var dagger = {
    "name": "Dagger",
    "cardType": cardType.weapon,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "marker" : 0,
    "card": new Image()
};
dagger.knownImage.src = "images/daggerbutton_known.png";
dagger.unknownImage.src = "images/daggerbutton_unknown.png";
dagger.knownSelectedImage.src = "images/daggerbutton_knownselected.png";
dagger.unknownSelectedImage.src = "images/daggerbutton_unknownselected.png";
dagger.icon.src = "images/DaggerIcon.png";
dagger.card.src = "images/DaggerCard.png";
var pipe = {
    "name": "Sword",
    "cardType": cardType.weapon,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "marker" : 0,
    "card": new Image()
};
pipe.knownImage.src = "images/swordbutton_known.png";
pipe.unknownImage.src = "images/swordbutton_unknown.png";
pipe.knownSelectedImage.src = "images/swordbutton_knownselected.png";
pipe.unknownSelectedImage.src = "images/swordbutton_unknownselected.png";
pipe.icon.src = "images/SwordIcon.png";
pipe.card.src = "images/SwordCard.png";

var revolver = {
    "name": "Poison",
    "cardType": cardType.weapon,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "marker" : 0,
    "card": new Image()
};
revolver.knownImage.src = "images/poisonbutton_known.png";
revolver.unknownImage.src = "images/poisonbutton_unknown.png";
revolver.knownSelectedImage.src = "images/poisonbutton_knownselected.png";
revolver.unknownSelectedImage.src = "images/poisonbutton_unknownselected.png";
revolver.icon.src = "images/PoisonIcon.png";
revolver.card.src = "images/PoisonCard.png";
var candlestick = {
    "name": "Staff",
    "cardType": cardType.weapon,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "marker" : 0,
    "card": new Image()
};
candlestick.knownImage.src = "images/staffbutton_known.png";
candlestick.unknownImage.src = "images/staffbutton_unknown.png";
candlestick.knownSelectedImage.src = "images/staffbutton_knownselected.png";
candlestick.unknownSelectedImage.src = "images/staffbutton_unknownselected.png";
candlestick.icon.src = "images/StaffIcon.png";
candlestick.card.src = "images/StaffCard.png";
var wrench = {
    "name": "Axe",
    "cardType": cardType.weapon,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "marker" : 0,
    "card": new Image()
};
wrench.knownImage.src = "images/axebutton_known.png";
wrench.unknownImage.src = "images/axebutton_unknown.png";
wrench.knownSelectedImage.src = "images/axebutton_knownselected.png";
wrench.unknownSelectedImage.src = "images/axebutton_unknownselected.png";
wrench.icon.src = "images/AxeIcon.png";
wrench.card.src = "images/AxeCard.png";
var rope = {
    "name": "Flail",
    "cardType": cardType.weapon,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "icon": new Image(),
    "marker" : 0,
    "card": new Image()
};
rope.knownImage.src = "images/flailbutton_known.png";
rope.unknownImage.src = "images/flailbutton_unknown.png";
rope.knownSelectedImage.src = "images/flailbutton_knownselected.png";
rope.unknownSelectedImage.src = "images/flailbutton_unknownselected.png";
rope.icon.src = "images/FlailIcon.png";
rope.card.src = "images/FlailCard.png";

//rooms
var conservatory = {
    "name": "Treasury",
    "cardType": cardType.room,
    door: [{"x": 4 , "y": 5}],
    exit: [{"x": 4 , "y": 6}],
    pos: [{"x": 2 , "y": 3},{"x": 1 , "y": 3},{"x": 3 , "y": 3},{"x": 1 , "y": 2},{"x": 2 , "y": 2},{"x": 3, "y": 2}],
    "card": new Image(),
    "marker" : 0,
};
var billiards = {
    "name": "Dungeon",
    "cardType": cardType.room,
    door: [{"x": 10, "y": 5}],
    exit: [{"x": 10 , "y": 6}],
    pos: [{"x": 8 , "y": 3},{"x": 9 , "y": 3},{"x": 10 , "y": 3},{"x": 8 , "y": 2},{"x": 9 , "y": 2},{"x": 10, "y": 2}],
    "card": new Image(),
    "marker" : 0,
};
var study = {
    "name": "Study",
    "cardType": cardType.room,
    door: [{"x": 24, "y": 5}],
    exit: [{"x": 24 , "y": 6}],
    pos: [{"x": 22 , "y": 3},{"x": 23 , "y": 3},{"x": 24 , "y": 3},{"x": 22 , "y": 2},{"x": 23 , "y": 2},{"x": 24, "y": 2}],
    "card": new Image(),
    "marker" : 0,
};
var ballroom = {
    "name": "Throne Room",
    "cardType": cardType.room,
    door: [{"x": 9, "y": 10}, {"x": 6, "y": 13}],
    exit: [{"x": 10 , "y": 10}, {"x": 6, "y": 14}],
    pos: [{"x": 4 , "y": 9},{"x": 6 , "y": 9},{"x": 3 , "y": 11},{"x": 7 , "y": 9},{"x": 2 , "y": 10},{"x": 5, "y": 11}],
    "card": new Image(),
    "marker" : 0,
    prop: new Image(),
    propPos: {x: 1, y: 10}
};
ballroom.prop.src = "./images/ThroneRoomProp.png";
ballroom.card.src = "./images/ThroneRoomCard.png";

var library = {
    "name": "Library",
    "cardType": cardType.room,
    door: [{"x": 15, "y": 6}],
    exit: [{"x": 15 , "y": 7}],
    pos: [{"x": 14 , "y": 3},{"x": 15 , "y": 3},{"x": 16 , "y": 3},{"x": 14 , "y": 2},{"x": 15, "y": 2},{"x": 16, "y": 2}],
    "card": new Image(),
    "marker" : 0,
    prop: new Image(),
    propPos: {x: 14, y: 1}
};
library.prop.src = "./images/LibraryProp.png";
library.card.src = "./images/LibraryCard.png";

var hall = {
    "name": "Gardens",
    "cardType": cardType.room,
    door: [{"x": 21, "y": 7}, {"x": 19, "y": 10}],
    exit: [{"x": 21 , "y": 6}, {"x":18 , "y": 10}],
    pos: [{"x": 22 , "y": 9},{"x": 21 , "y": 10},{"x": 23 , "y": 11},{"x": 23 , "y": 9},{"x": 22 , "y": 10},{"x": 21, "y": 11}],
    "card": new Image(),
    "marker" : 0,
};
var kitchen = {
    "name": "Kitchen",
    "cardType": cardType.room,
    door: [{"x": 7, "y": 17}],
    exit: [{"x": 8 , "y": 17}],
    pos: [{"x": 2 , "y": 17},{"x": 3 , "y": 17},{"x": 4 , "y": 17},{"x": 5 , "y": 17},{"x": 6 , "y": 17},{"x": 1, "y": 17}],
    "card": new Image(),
    "marker" : 0,
};
var dining = {
    "name": "Dining room",
    "cardType": cardType.room,
    door: [{"x": 13, "y": 14}],
    exit: [{"x": 13 , "y": 13}],
    pos: [{"x": 14 , "y": 16},{"x": 15 , "y": 16},{"x": 13 , "y": 16},{"x": 14 , "y": 17},{"x": 15 , "y": 17},{"x": 13, "y": 17}],
    "card": new Image(),
    "marker" : 0,
};
var lounge = {
    "name": "Bedroom",
    "cardType": cardType.room,
    door: [{"x": 19, "y": 15}],
    exit: [{"x": 19 , "y": 14}],
    pos: [{"x": 20 , "y": 17},{"x": 21 , "y": 17},{"x": 22 , "y": 17},{"x": 23 , "y": 17},{"x": 24 , "y": 17},{"x": 25, "y": 17}],
    "card": new Image(),
    "marker" : 0,
};


var suspects = [scarlett, mustard, green, peacock, plum, white];
var allSuspects = suspects.slice();
var weapons = [dagger, pipe, wrench, rope, candlestick, revolver];
var allWeapons = weapons.slice();
var rooms = [conservatory, billiards, study, ballroom, library, hall, kitchen, dining, lounge];
var allRooms = rooms.slice();

var solutionSuspect;
var solutionAnswer;
var solutionRoom;

var playerKnows = [];
var playerHolds = [];
var oneKnows = [];
var oneHolds = [];
var twoKnows = [];
var twoHolds = [];

var selectedSuspect = scarlett;
var selectedWeapon = dagger;
var selectedRoom = hall;
