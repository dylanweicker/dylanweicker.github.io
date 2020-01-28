<template>
  <div id="app">
    <div class="header">
      <img src="./assets/pathfinder-logo.png" style="max-height: 80px; width: auto;">
      <h1>Pathfinder 1E Character Generator</h1>
      <ul class="progress-tracker">
        <li v-for="(step, index) in steps" v-bind:key="step" class="progress-step" :class="{'is-complete': index < currStep, 'is-active': index == currStep}">
          <div class="progress-marker" :data-text="(index < currStep) ? '✓' : index+1"></div>
            <div class="progress-text">
              <h4 class="progress-title">{{step}}</h4>
            </div>
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="row">
        <div class="preview-column col-sm-12 col-md-3 col-lg-3">
          <character-preview
            :name="name"
            :abilities="abilities"
            :race="race"
            :klass="klass"
            :favouredKlass="favouredKlass"
            :feats="feats"
          >
          </character-preview>
        </div>
        <div class="col-sm-12 col-md-9 col-lg-9">
          <select-name
            v-if="currStep == 0"
            @set-name="setName"
            @set-gender="setGender"
            @set-pronouns="setPronouns"
          >
          </select-name>
          <select-abilities
            v-if="currStep == 1"
            :name="name"
            :pronouns="pronouns"
            :abilities="baseAbilities"
            @set-abilities="setAbilities"
            @set-ability-points-ratio="setAbilityPointsRatio"
          >
          </select-abilities>
          <select-race
            v-if="currStep == 2"
            :propRace="race"
            :abilities="abilities"
            :name="name"
            :pronouns="pronouns"
            @set-race="setRace"
            @set-my-languages="setMyLanguages"
          >
          </select-race>
          <select-class
            v-if="currStep == 3"
            :propKlass = klass
            :race="race"
            :abilities="abilities"
            :name="name"
            :pronouns="pronouns"
            @set-klass="setKlass"
            @set-favoured-klass="setFavouredKlass"
          >
          </select-class>

          <select-skills
            v-if="currStep == 4"
            :skillPoints="skillPoints"
            :klass="klass"
            :race="race"
            :abilities="abilities"
            :name="name"
            :pronouns="pronouns"
          >
          </select-skills>

          <select-feat
            v-if="currStep == 5"
            :klass="klass"
            :race="race"
            :abilities="abilities"
            :name="name"
            :pronouns="pronouns"
          >
          </select-feat>

          <select-equipment
            v-if="currStep == 6"
            :feats="feats"
            :klass="klass"
            :race="race"
            :abilities="abilities"
            :name="name"
            :pronouns="pronouns"
          >
          </select-equipment>

          <select-details
            v-if="currStep == 7"
            :feats="feats"
            :klass="klass"
            :race="race"
            :abilities="abilities"
            :name="name"
            :pronouns="pronouns"
          >
          </select-details>

          <div class="page-buttons">
            <button v-if="currStep > 0" v-on:click="prevStep" class="btn btn-lg btn-primary btn-previous">Previous</button>
            <div>
             <button v-if="currStep < steps.length-1" v-on:click="nextStep" class="btn btn-lg btn-primary btn-next" :disabled="!canProceed">
                Next
                <p id="proceedError">
                  {{proceedError}}
                </p>
              </button>
              <button v-if="currStep == steps.length-1" class="btn btn-lg btn-primary btn-next" disabled="true">
                Finish!
                <p id="proceedError">
                  "This hasn't been implemented yet."
                </p>
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var character = {
  debug: true,
  name: '',
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}


import CharacterPreview from './components/CharacterPreview.vue';
import SelectName from './components/SelectName.vue';
import SelectAbilities from './components/SelectAbilities.vue';
import SelectRace from './components/SelectRace.vue';
import SelectClass from './components/SelectClass.vue';
import SelectSkills from './components/SelectSkills.vue';
import SelectFeat from './components/SelectFeat.vue';
import SelectEquipment from './components/SelectEquipment.vue';
import SelectDetails from './components/SelectDetails.vue';

export default {
  name: 'app',
  components: {
    SelectName,
    CharacterPreview,
    SelectAbilities,
    SelectRace,
    SelectClass,
    SelectSkills,
    SelectFeat,
    SelectEquipment,
    SelectDetails
  },
  data: function() {
    return {
      //Progress Tracker
      steps: ['Name', 'Abilities', 'Race', 'Class', 'Skills', 'Feats', 'Equipment', 'Details'],
      currStep: 0,
      proceedError: "",

      //Name & Gender
      name: "",
      gender: "",
      pronouns: {},

      //Abilities
      baseAbilities: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      abilityPointsRatio: 0,

      //Race
      race: null,
      myLanguages: ['Common'],

      //Class
      klass: null,
      favouredKlass: '',

      //Skills
      skills: null,

      //Feats
      feats: [],

      //Equipment
      equipment: null,

      //Details
      details: null
    };
  },
  methods: {
    prevStep: function () {
      if ( this.currStep > 0 ) {
        this.currStep--;
        window.scrollTo(0, 240);
      }
    },
    nextStep: function() {
      if ( this.currStep < this.steps.length-1 ) {
        this.currStep++;
        window.scrollTo(0, 240);
      }
    },
    setName: function( value ){
      this.name = value;
    },
    setGender: function( value ){
      this.gender = value;
    },
    setPronouns: function( value ){
      this.pronouns = value;
    },
    setAbilities: function( value ){
      this.baseAbilities = value;
    },
    setAbilityPointsRatio: function( value ){
      this.abilityPointsRatio = value;
    },
    setRace: function( value ){
      this.race = value;
    },
    setKlass: function( value ){
      this.klass = value;
    },
    setFavouredKlass: function( value ){
      this.favouredKlass = value;
    },
    setMyLanguages: function( value ) {
      this.myLanguages = value;
    },
    getMod: function( score ) {
      var bonus = Math.floor( ( score - 10 ) / 2 );
      if ( bonus > 0 ) {
        return '+' + bonus;
      } else {
        return bonus;
      }
    }
  },
  computed: {
    canProceed: function() {
      var result;
      switch( this.currStep ) {
        case 0: 
          result = (this.name && this.name.length > 0);
          this.proceedError = result ? "" : "Choose a name before proceeding!";
          return result;
        case 1:
          result = (this.abilityPointsRatio <= 1)
          this.proceedError = result ? "" : "You have spent too many points on your abilities!";
          return result;
        case 2:
          result = this.race != null;
          this.proceedError = result ? "" : "You must select a race!";
          return result;
        case 3:
          result = this.klass != null;
          this.proceedError = result ? "" : "You must select a class!";
          return result;
        default:
          return true;
      }
    },
    abilities: function() {
      if (this.race && this.race.abilities) {
        return {
          strength: this.baseAbilities.strength + this.race.abilities.strength,
          dexterity: this.baseAbilities.dexterity + this.race.abilities.dexterity,
          constitution: this.baseAbilities.constitution + this.race.abilities.constitution,
          intelligence: this.baseAbilities.intelligence + this.race.abilities.intelligence,
          wisdom: this.baseAbilities.wisdom + this.race.abilities.wisdom,
          charisma: this.baseAbilities.charisma + this.race.abilities.charisma
        }
      }
      return {
        strength: this.baseAbilities.strength,
        dexterity: this.baseAbilities.dexterity,
        constitution: this.baseAbilities.constitution,
        intelligence: this.baseAbilities.intelligence,
        wisdom: this.baseAbilities.wisdom,
        charisma: this.baseAbilities.charisma
      }
    },
    skillPoints: function() {
            let skills = parseInt(this.klass.skillPoints) + parseInt(this.getMod(this.abilities.intelligence));
            skills = ('human' === this.race.race) ? skills + 1 : skills;
            if ( skills > 0) {
                return ( 'sp' === this.favouredKlass ) ? skills + 1 : skills;
            }
            else {
                return ( 'sp' === this.favouredKlass ) ? 2 : 1;
            }
        },
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Amethysta|Titillium+Web&display=swap');
@import "node_modules/progress-tracker/src/styles/progress-tracker.scss";
@import '~pretty-checkbox/src/pretty-checkbox.scss';

body{
  --darker-color: #1c0000;
  --dark-color: #3a0000;
  --primary-color:#5e0000;
  --light-color: #861515;
  --lighter-color: #af3737;
  --lightest-color: #ffa5a5;
  --secondary-color:#ffeebd;
  --secondary-color-light:#fff6db;
  --secondary-color-lighter:#fffcf2;
}

#app {
  font-family: 'Titillium Web', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--darker-color);
  margin-top: 60px;
}

  p {
    font-size: 1.6rem;
  }

  .header {
    text-align: center;
    
    .progress-tracker {
      max-width: 800px;
      width: 80%;

      .progress-marker::before{
        padding-bottom: 0;
      }

      .progress-step.is-complete .progress-marker::before {
        background-color: var(--primary-color);
      }

      .progress-step{
        &.is-active {
          .progress-marker::before {
            background-color: var(--light-color);
          }

          .progress-text{
            color: var(--light-color);
          }
        }

        &:last-child {
          .progress-text {
            left: -24px;
            transform: translateX(0);
          }
        }

        &:hover {
          .progress-marker::before{
            background-color: #b6b6b6;
          }
          &.is-active .progress-marker::before{
            background-color: var(--light-color);
          }
          &.is-complete .progress-marker::before{
            background-color: var(--primary-color);
          }
        }

        .progress-text{
          overflow: visible;
          position: relative;
          left: 12px;
          transform: translateX(-50%);
        }

        @media only screen and (max-width: 780px) {
          .progress-text {
            display: none;
          }
        }
      }
    }
  }

@media only screen and (min-width: 992px){
  .preview-column {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 2rem;
  }
}


h1, h2 {
    font-family: 'Amethysta', serif;
    color: var(--primary-color);
}

.section-header {
  margin-top: -2rem;
}

.ntm {
  margin-top: 0;
}

h4 {
  font-weight: bold;
  margin-top: 3rem;
}

h5 {
  font-size: 12px;
  border-top: solid thin;
  border-bottom: solid thin;
  text-transform: uppercase;
  padding: 3px 0 2px;
  margin-bottom: 2px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: list-item;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.box-shadow {
  /*box-shadow: 0 2px 6px #ccc;*/
  box-shadow: 0 0.4rem 1.2rem rgba(0,0,0,0.2);
  border-radius: 4px;
}

.content {
  padding: 2rem;
}

.caption {
  font-size: 13px;
  color: rgb(97, 97, 97);
}


.radio-toolbar, .checkbox-toolbar {
  input[type="radio"], input[type="checkbox"] {
    opacity: 0;
    position: fixed;
    width: 0;

    &:hover + label {
      background-color: var(--secondary-color-light);
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    &:checked + label {
      background-color: var(--light-color);
      border-color: var(--primary-color)!important;
      color: white;
    }

  }

  label {
    display: inline-block;
    background-color: transparent;
    padding: 1rem 2rem;
    margin-right: 1rem;
    font-family: sans-serif, Arial;
    font-size: 16px;
    color: var(--light-color);
    border: 1px solid var(--light-color);
    border-radius: 4px;
    cursor: pointer;
  }
}

input[type="text"] {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.page-buttons{
  padding-top: 2rem;
  padding-bottom: 6rem;
  position: relative;
  display: flex;
  justify-content: space-between;

  .btn-next{
    position: absolute;
    right: 0;
  }
}

.btn-primary, .btn-primary:visited {
  background-color: var(--light-color);
  border-color: var(--light-color);
}

.btn-primary:hover, .btn-primary:active, .btn-primary:focus, .btn-primary:active:focus {
  background-color: var(--primary-color)!important;
  border-color: var(--primary-color)!important;
  color: white;
}

.btn-outline-primary, .btn-outline-primary:visited {
    color: var(--light-color);
    border-color: var(--light-color);
    background-color: transparent;
}

.btn-outline-primary:active, .btn-outline-primary:hover, .btn-outline-primary:active:hover {
  background-color: var(--secondary-color-light);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

  #proceedError{
    position: absolute;
    top: 100%;
    margin-top: 0.5rem;
    right: 0;
    font-size: 1.4rem;
    color: white;
  }

  button:hover #proceedError {
    color: var(--primary-color);
  }

.cap {
    text-transform: capitalize;
}

.csli:not(:last-child):after {
    content: ', ';
}
</style>
