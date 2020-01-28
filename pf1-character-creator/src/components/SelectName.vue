<template>
	<div id="select-name" class="main-col-content">
		<div class="content">
			<h2 class="section-header">Greetings Adventurer!</h2>
			<p>From the sly rogue to the stalwart paladin, Pathfinder allows you to make the character you want to play. When generating a character, start with your character's concept. Do you want a character who goes toe-to-toe with terrible monsters, matching sword and shield against claws and fangs? Or do you want a mystical seer who draws his powers from the great beyond to further his own ends? Nearly anything is possible.</p><p>
			Once you have a general concept worked out, this web app can help bring your idea to life.</p>
			
		</div>
		<div class="content box-shadow text-center">
			<h3 class="ntm">Let's get started with the basics.</h3>
			<h4>What is your character's gender?</h4>
			<div class="radio-toolbar">
				<input v-model="gender" @change="selectGender" type="radio" name="gender" id="select-gender-male" value="male" checked>
				<label for="select-gender-male">Male</label>
				<input v-model="gender" @change="selectGender" type="radio" name="gender" id="select-gender-female" value="female">
				<label for="select-gender-female">Female</label>
				<input v-model="gender" @change="selectGender" type="radio" name="gender" id="select-gender-other" value="other">
				<label for="select-gender-other">Other</label>
			</div>
			<div v-if="gender == 'other'">
				<h4>What are your character's pronouns?</h4>
				<input v-model="pronouns.they" @change="$emit('set-pronouns', pronouns)" type="text"  placeholder="they">
				<input v-model="pronouns.them" @change="$emit('set-pronouns', pronouns)" type="text"  placeholder="them">
				<input v-model="pronouns.their" @change="$emit('set-pronouns', pronouns)" type="text"  placeholder="their">
				<input v-model="pronouns.theirs" @change="$emit('set-pronouns', pronouns)" type="text"  placeholder="theirs">
				<input v-model="pronouns.themself" @change="$emit('set-pronouns', pronouns)" type="text" placeholder="themself">
			</div>
			<h4>What is your character's name?</h4>
			<div class="input-group mb-3" style="display: flex; justify-content: center;">
				<input v-model="name" @change="$emit('set-name', name)" id="input-name" type="text" placeholder="Character Name" class="input input-lg" aria-label="Character Name" aria-describedby="character-name">
				<button class="btn btn-outline-primary" v-on:click="randomizeName">Randomize Name</button>
			</div>
		</div>
    </div>
</template>

<script>
export default {
	data: function () {
		return {
			maleNames: ["Abraham","Adam","Adrian","Alban","Alexander","Allen","Amor","Andrew","Androw","Androwe","Anthonie","Anthony","Anthonye","Aquila","Arthur","Augustine","Avery","Ayland","Barnaby","Barnard","Bartholomew","Bartram","Benedict","Benjamin","Bernard","Chambrs","Charles","Christopher","Clare","Cleeve","Clement","Cornelius","Cuthbert","Daniel","Danyell","David","Dennis","Eastyn","Edmond","Edmonde","Edmund","Edward","Edwarde","Elias","Elisha","Elling","Emanual","Emanuel","Emanuell","Emmanuel","Erasmus","Esau","Esdras","Evered","Ezekiel","Florence","Francis","Fulke","Gabriel","Gabriell","Galwell","Garret","Geoffraie","Geoffrey","George","Gerard","Gilbert","Giles","Godfrey","Godsgift","Gregory","Harry","Harrye","Henrie","Henry","Henrye","Hugh","Hughe","Hugo","Humphrey","Humphrie","Isaac","Jacob","James","Jeames","Jeffrey","Jeffrye","Jeremy","Jerome","Johen","John","Joseph","Joshua","Josias","Jude","Julian","Lancelot","Lawrence","Leonard","Leonarde","Lewis","Lionel","Luke","Mark","Marmaduke","Martin","Mathias","Mathusela","Matthew","Michael","Migsett","Miles","Mychaell","Myles","Nathan","Nathaniel","Nathaniell","Nathanyell","Nazereth","Nicholas","Nicholaus","Nycholas","Octavian","Oliver","Osmund","Oswyn","Parry","Peter","Philip","Piers","Powell","Rafe","Ralph","Raphe","Reignold","Reynold","Richard","Richarde","Robert","Roberte","Roger","Roland","Rowland","Rycharde","Salathiell","Sampson","Samuel","Samuell","Simon","Solomon","Stephen","Theophilus","Thomas","Timothy","Titus","Tobias","Uric","Valentine","Valentyne","Vincent","Walter","William","Wolstan","Zacharia"],
			femaleNames: ["Abigail","Agnes","Ales","Alice","Alyce","Amphillis","Amy","Ann","Anna","Annabel","Anne","Annes","Anthonye","Audrey","Avice","Avis","Barbara","Beatrice","Benedicta","Bennet","Bennett","Betella","Bethia","Bethsabe","Blanche","Blythe","Bridget","Catherine","Cecily","Charity","Christabell","Christean","Christian","Christina","Cicely","Clare","Clemence","Constance","Cybil","Deborah","Denise","Diana","Dorcas","Dorithie","Dorothee","Dorothy","Eale","Edith","Edony","Eleanor","Elinor","Elizabeth","Elizabethe","Ellen","Ellyn","Emma","Ester","Esther","Eylmer","Faith","Florence","Fortune","Frances","Francis","Fraunces","Frideswide","Gillian","Good","Grace","Grissell","Hannah","Helen","Holwice","Honor","Isabel","Isabell","Jane","Janet","Joan","Joane","Josian","Joyce","Judeth","Judith","Judithe","Julian","Katherine","Katheryne","Lettice","Love","Lucy","Lydia","Mabel","Margaret","Margarett","Margerie","Margery","Margerye","Margret","Margrett","Maria","Marian","Marie","Mariella","Marion","Martha","Mary","Marye","Mathaye","Maud","Mildred","Millicent","Myrna","Olive","Parnell","Patience","Philippa","Phoebe","Pleasance","Priscilla","Prudence","Rachel","Rebecca","Rebecka","Rose","Ruth","Sara","Sarah","Sidney","Sindony","Stephana","Susan","Susanna","Suzanna","Sybell","Sybil","Sybyll","Syndony","Temperance","Thomasin","Unice","Ursula","Vashti","Wilmot","Winifred","Wyborough","Wynefrede","Wynefreed","Wynnefreede","Zephora"],
			surnames: ["Abell","Abery","Acworth","Adams","Addicock","Alard","Albyn","Aldebourne","Alfraye","Alikok","Alington","Alleine","Amcottes","Amondesham","Andrews","Annesley","Ansty","Archer","Ardalle","Arderne","Argentein","Arnold","Arthur","Asger","Ashenhurst","Ashtor","Askew","Asplyn","Assheby","Assheton","Astley","Atherton","Atkinson","Atlee","Attilburgh","Aubrey","Audeley","Auldyngton","Aumberden","Ayde","Ayleward","Aylmer","Aynesworth","Ayshecombe","Babham","Babyngton","Bacon","Badby","Bailey","Baker","Balam","Baldwin","Ballard","Ballett","Bamard","Barantyn","Barber","Bardolf","Baret","Barfoot","Barker","Barnes","Barre","Barrentyne","Barstaple","Bartelot","Barton","Basset","Batherst","Battersby","Battyl","Baynton","Beauchamp","Beaumont","Beaurepaire","Bedell","Bedgbery","Bedingfeld","Beel","Beer","Bekyngham","Bell","Bende","Bennet","Benthey","Berdwell","Berecraft","Beresford","Berkhead","Bernard","Bernewelt","Berney","Berry","Berwyk","Best","Beton","Bettesthorne","Bewforest","Bewley","Bexley","Bigley","Bilingford","Bischoptree","Bishop","Bladwell","Blakeley","Blakewell","Blaknall","Blakwall","Blakwell","Blenerhayset","Blexham","Blodwell","Blome","Blondell","Blount","Blundell","Boddinham","Bohan","Boote","Boothe","Borell","Borrow","Bosby","Bost","Bostock","Boston","Boteler","Bothy","Bouldre","Bourne","Boville","Bowcer","Bowett","Bownell","Bowthe","Bowyar","Bradbridge","Bradshawe","Bradstane","Bradston","Bramfield","Brampton","Branche","Branwhait","Brassie","Braunstone","Bray","Brayles","Brecknock","Bredham","Brent","Bret","Brewse","Brewster","Brewys","Bridgeman","Briggs","Brinckhurst","Brocksby","Brodeway","Brodnax","Brokhill","Brome","Brook","Brougham","Broughton","Brouncker","Browet","Brown","Brownflet","Brownyng","Brudenell","Bryan","Bryn","Brystowe","Bulkeley","Bulstrode","Burgess","Burgh","Burghehyll","Burgoyn","Burlton","Burnell","Burton","Buryngton","Bushbury","Bushe","Buslingthorpe","Butler","Byfield","Byllyng","Byngham","Byrde","Byschoppeson","Caley","Callthorp","Campeden","Canon","Canteys","Cantilupe","Carbonall","Cardiff","Carew","Carlyll","Carter","Cary","Caseberde","Cassy","Castell","Castletown","Catesby","Cavell","Caxaton","Cely","Chamburleyn","Champneys","Chanceler","Chancey","Chapman","Charlis","Chase","Chatwyn","Chauncey","Chaundeler","Cheberell","Chechester","Cheddar","Chelde","Chelseye","Chernocke","Chester","Chetwoode","Cheyne","Child","Chowne","Chudderle","Churmound","Chylton","Chyrche","Claimond","Clarell","Clark","Clavell","Claybrook","Cleffort","Clement","Clerk","Clifton","Clitherow","Clopton","Clyfford","Cobbe","Cobham","Coblegh","Cockayne","Cod","Codington","Coffyn","Coggeshall","Colard","Colby","Cole","Colkins","Colmer","Colt","Complyn","Compton","Conquest","Cooke","Coorthopp","Copinger","Corbett","Corby","Cossale","Cosworth","Cosyngton","Cotton","Coulthurst","Courtenay","Covert","Cowill","Cox","Crane","Cranford","Crawley","Crekett","Cressy","Crispe","Cristemas","Crocker","Crugge","Cryppys","Cuddon","Culpeper","Cunnyngham","Curson","Curteys","Daelyngridge","Dagworth","Dale","Dalison","Damsell","Danet","Danvers","Darcy","Darley","Daubernoun","Daunce","Daundelyon","Dauntesay","Davers","Davy","Dawne","Day","Deacons","Delabere","Delamere","Dely","Demoke","Dencourt","Dene","Denton","Denys","Dericote","Dering","Deryngton","Desford","Digby","Dixton","Doddle","Dogmersfield","Donnet","Doreward","Dormer","Dove","Dow","Downer","Draper","Draw","Drayton","Driland","Dryden","Dunch","Duncombe","Dunham","Duredent","Dusteby","Dye","Dygenys","Dyneley","Dynham","Echyngham","Edgar","Edgcomb","Edgerley","Edwards","Egerton","Eggerley","Eglisfelde","Eldysley","Elmebrigge","Elyot","Elys","Emerson","Engeham","Engleford","Englysche","Epworth","Erewaker","Ermyn","Ertham","Esmund","Estbury","Estney","Estone","Etton","Everard","Everdon","Evrenden","Evyngar","Eyer","Eyston","Fabyan","Faldo","Fane","Faryndon","Faylare","Fayneman","Felbrigg","Feld","Fenton","Ferrer","Feversham","Ffrewyll","Fienley","Finch","Fitton","Fitzgeffrey","Fitzherbert","Fitzlewis","Fitzralph","Fitzwarym","Fitzwilliyam","Fleet","Fleming","Fletewoode","Flexney","Flower","Fodde","Fogg","Foliot","Foljambe","Follywolle","Folon","Folsham","Forde","Fortescue","Fortey","Fowler","Fox","Francey","Frankeleyn","Fraunces","Freer","Freville","Frilende","Frilleck","Frogenhall","Fromond","Froste","Frowseloure","Frye","Fryth","Fulburne","Fulmer","Funteyn","Furnace","Fynderne","Fyneux","Fysher","Gage","Galey","Garard","Gardyner","Gare","Garneys","Garret","Gascoigne","Gasper","Gavell","Gaynesford","Geddyng","Geffray","George","Gerard","Gerville","Geste","Gibbs","Gifford","Gilbert","Ginter","Glenham","Glennon","Glover","Goberd","Goddam","Godfrey","Golde","Golding","Goldwell","Gomersall","Gomfrey","Gonson","Good","Goodenouth","Goodere","Goodluck","Goodnestone","Goodryke","Goodryngton","Goodwyn","Goring","Gorney","Gorste","Gosebourne","Grafton","Greenway","Grene","Grenefeld","Greville","Grey","Grobbam","Grofhurst","Groston","Grove","Grymbalde","Guildeforde","Gyll","Gysborne","Gyttyns","Hache","Hackeman","Haddock","Haddon","Hadresham","Hakebourne","Hale","Hall","Halley","Halshan","Hambard","Hammer","Hamond","Hampden","Hancock","Hansart","Harbird","Harbotle","Harcourt","Hardy","Harewell","Hargreve","Harlakinden","Harleston","Harley","Harpeden","Harper","Harris","Harryses","Harte","Harwood","Hasard","Hatteclyff","Haukesworth","Hawkins","Hawtrey","Haye","Hayes","Hayton","Helme","Henshawe","Herleston","Heron","Hertcombe","Herwy","Hewes","Heydon","Heywood","Heyworth","Hicchecok","Higate","Higden","Hille","Hoare","Hobart","Hobert","Hodgeson","Holbrook","Holcot","Holes","Holland","Holsey","Holt","Holton","Hopton","Horman","Hornebolt","Hornley","Horsey","Horthall","Horton","Hosteler","Hotham","Howard","Huchenson","Huddleston","Hugeford","Hunden","Hungate","Hunston","Hurst","Hussey","Hyde","Hyenson","Hylderley","Hyll","Inwood","Isley","Jackmann","Jackson","James","Janner","Jarman","Jay","Jendring","Jenney","Johnson","Jordan","Joslyne","Joulon","Jowchet","Kekilpenny","Kellett","Kelly","Kemp","Kent","Keriell","Kesteven","Key","Kidwelly","Killigrew","Kinge","Knevynton","Knighton","Knody","Knoyll","Knyvet","Kottow","Kydwelly","Kyllyngworth","Kyrkeby","Kytson","Lacy","Laken","Lamber","Lambton","Langeton","Langham","Langstone","Lappage","Latham","Latton","Launceleyn","Lave","Lawnder","Leeche","Leeds","Lehenard","Leigh","Leighlin","Leman","Lenton","Lestrange","Letterford","Leventhorpe","Leverer","Leveson","Lewys","Leynham","Leynthall","Lichefield","Livesey","Lloyd","Lockton","Lodyngton","Lond","London","Long","Longton","Lovell","Loveney","Loveryk","Lowe","Lowthe","Lucy","Ludsthorp","Luke","Lumbarde","Lupton","Lyfelde","Lymsey","Lynde","Lyon","Lyrypine","Lysle","Lytcott","Lyttleburye","Lytton","Lyveryche","Makepiece","Malemayns","Malster","Maltoun","Malyns","Manfield","Manston","Mapilton","Marcheford","Mareys","Markeley","Marsham","Marten","Mason","Massyngberde","Maudit","Mauntell","Maycot","Maydestone","Mayne","Maynwaring","Mede","Medeley","Merden","Mereworth","Merstun","Merton","Metcalf","Michelgrove","Millys","Milsent","Moland","Molyngton","Molyns","Monde","Montacute","Montagu","Moore","More","Morecote","Morley","Mortymer","Moryet","Morys","Motesfont","Mowfurth","Mugge","Mullens","Muston","Myddilton","Myllet","Mylner","Narbrige","Nash","Neceham","Nele","Nevinson","Newdegate","Newman","Noke","Norbury","Norden","Norrys","North","Northwoode","Norton","Norwich","Norwood","Notfelde","Notyngham","Nysell","Obson","Oke","Oken","Oliver","Olyngworthe","Osborne","Osteler","Osyllbury","Outlawe","Oxenbrigg","Page","Pagge","Palmer","Panshawe","Papley","Parker","Parret","Parris","Parsons","Paston","Pattesley","Payne","Peacok","Pecke","Peckham","Peele","Pekham","Peletoot","Peltie","Pemberton","Pen","Penhallick","Pennebrygg","Perchehay","Perot","Perryvalle","Petham","Petley","Pettit","Pettwoode","Peyton","Phelip","Philips","Playters","Plessi","Plymmyswoode","Poffe","Pole","Polsted","Polton","Porter","Portyngton","Potter","Poulet","Pownder","Pratt","Pray","Prelatte","Prophete","Prowd","Purlles","Pursglove","Purvoche","Pygott","Pylet","Pynnoke","Pynty","Quintin","Radley","Rampston","Ramsey","Ratcliff","Rawlyn","Rawson","Raynsford","Rede","Redman","Reeve","Reynes","Reynesford","Richeman","Rikhill","Risley","Roberts","Robertson","Robins","Robynson","Rochester","Rochforth","Roland","Rolleston","Rondel","Ront","Roper","Rotheley","Rous","Rowdon","Rowe","Rowlatt","Rowley","Rudhall","Rufford","Ruggenale","Ruggeweyn","Rusche","Russell","Ryall","Rykeworth","Rynger","Ryppringham","Sacheverell","Sackville","Sadler","Salford","Salle","Salter","Saltonstall","Sampson","Samuell","Sanburne","Sandes","Saunders","Saunterton","Savill","Sayer","Saynsbery","Scarclyf","Scollfyld","Scot","Scrogs","Scrope","Sedley","Sedlow","Seger","Selwyn","Sencler","Sentjohn","Serche","Sever","Seymour","Seyntaubyn","Seys","Sharman","Shawe","Sheffeld","Sheraton","Sherbourne","Sherman","Shevington","Shingleton","Shipwash","Shiveley","Shorditch","Shosmyth","Shotbolt","Shylton","Sibill","Silvester","Skipwith","Sleford","Slyfield","Smith","Snayth","Snell","Snelling","Sotton","Sparrow","Spebynton","Speir","Spelman","Spencer","Spetyll","Spicer","Sprottle","Sprunt","Stace","Stanbury","Standon","Stanley","Stanwix","Staple","Staunton","Staverton","Stepney","Stevyn","Stocks","Stodeley","Stoke","Stokerton","Stokes","Stokey","Stokton","Stone","Stoner","Stoughton","Strachleigh","Strader","Strangewayes","Strelley","Strete","Stubbe","Styles","Stylle","Styward","Sulyard","Sumner","Swan","Swetecok","Swetenham","Switte","Symeon","Symons","Tabard","Tame","Taylor","Tedcastle","Theobauld","Thomas","Thornburgh","Thorne","Thornton","Thorp","Throkmorton","Thursby","Tibborde","Tilghman","Tiploft","Topsfield","Torryngton","Tothyll","Town","Tregonwell","Treningham","Trenowyth","Trevet","Trumpington","Tubney","Turner","Twarby","Tweedye","Tyndall","Tyrell","Ufford","Underhill","Unton","Upton","Urswic",
				"Vass","Vaughan","Vawdrey","Veldon","Verney","Vernon","Vinter","Wade","Wadham","Wake","Waldegrave","Waldeley","Walden","Walford","Walkden","Walker","Wallace","Walley","Walrond","Walsch","Waltham","Walton","Wanteley","Wappelode","Warbulton","Warde","Wardeby","Wardrieu","Wardyworth","Warner","Warren","Wayte","Webb","Weekes","Welbek","Welby","Wellins","Wenman","Wensley","West","Westbrook","Westlake","Weston","Wetherden","Wexcombe","Whalley","White","Whitewood","Whowood","Whytton","Whytyng","Wightman","Wilkins","Willardsey","Williams","Willmer","Willys","Wilson","Windham","Wingfield","Wiseman","Wolrond","Wolstonton","Woodbrygge","Woode","Woodeward","Worsley","Wotton","Wreke","Wrenne","Wright","Wulvedon","Wyard","Wyatt","Wyddowsoun","Wyghtham","Wylcotes","Wylde","Wylmot","Wymer","Wyncall","Wynston","Wynstryngham","Wynter","Wythinghall","Wyvil","Yate","Yaxley","Yden","Yelverton","Yerde","York","Yornold","Young"],
			name: "",
			gender: "male",
			pronouns: {
				they: "he",
				them: "him",
				their: "his",
				theirs: "his",
				themself: "himself"
			}
		}
	},
	methods: {
		randomizeName: function () {
			var randName;
			var rnd;
			var rnd2 = Math.floor( Math.random() * this.surnames.length );
			if ( 'female' === this.gender ) {
				rnd = Math.floor( Math.random() * this.femaleNames.length );
				randName = this.femaleNames[ rnd ] + " " + this.surnames[ rnd2 ];
			} else {
				rnd = Math.floor( Math.random() * this.maleNames.length );
				randName = this.maleNames[ rnd ] + " " + this.surnames[ rnd2 ];
			}
			this.name = randName;
			this.$emit('set-name', this.name);
		},
		selectGender: function () {
			if ('male' == this.gender) {
				this.pronouns = {
					they: "he",
					them: "him",
					their: "his",
					theirs: "his",
					themself: "himself"
				};
			} else if ('female' == this.gender) {
				this.pronouns = {
					they: "she",
					them: "her",
					their: "her",
					theirs: "hers",
					themself: "herself"
				};
			} else if ('other' == this.gender) {
				this.pronouns = {
					they: "they",
					them: "them",
					their: "their",
					theirs: "theirs",
					themself: "themself"
				};
			}
			this.$emit('set-gender', this.gender);
			this.$emit('set-pronouns', this.pronouns);
		},
	},
	mounted() {
		this.$emit('set-gender', this.gender)
		this.$emit('set-pronouns', this.pronouns)
	}
};
</script>