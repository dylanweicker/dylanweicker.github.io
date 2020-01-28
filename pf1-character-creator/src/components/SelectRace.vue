
<template>
    <div id="select-abilities" class="main-col-content">
        <div class="content">
            <h2 class="section-header">Now let's pick a race!</h2>
            <p>In Pathfinder, race is a fundamental part of every character. Race mixes biology and culture, then translates those concepts into racial traits. A race's traits, history, and culture all frame your character. This is true whether you play to or against the race's stereotypes.
            <p>Choosing your character's race is one of the more important decisions you'll need to make. Each race is best suited to a specific type of role -- dwarves make better fighters than they do sorcerers, while halflings aren't as good as half-orcs at being barbarians. The races presented here have wildly different abilities, personalities and societies, but at the same time none of the races here deviate too far from humanity and all of their abilities are roughly equal and balanced.</p>
        </div>
        <div class="content box-shadow text-center">
            <h4 class="ntm">Select a race.</h4>
            <div class="radio-toolbar select-race content">
                <template v-for="(race, raceName) in races">
                    <input 
                        v-model="myRace" 
                        :key="raceName + '-input'" 
                        type="radio" 
                        name="race" 
                        :id="'select-race-' + raceName" 
                        :value="race" 
                        @change="updateRace">
                    <label :for="'select-race-' + raceName"  :key="raceName">
                        <div>
                            <img class="select-race__image" :src="'src/assets/' + race.image"><br>
                            {{race.race}}
                        </div>
                    </label>
                </template>
            </div>
        </div>
        <div v-if="myRace" class="content">
            <h2 class="race-title cap">{{myRace.race}}</h2>
            <p>{{myRace.description}}</p>
            <h3>Standard Traits</h3>
            <p v-if="!myRace.freeAbility" class="ability-bonuses">
                <strong>Ability Scores:</strong>
                <span v-for="(mod, ability) in myRace.abilities" :key="'race-ability-bonus-' + ability">
                    <template v-if="mod > 0"> +{{mod}} {{ability}}, </template>
                </span>
                but
                <span v-for="(mod, ability) in myRace.abilities" :key="'race-ability-penalty-' + ability">
                    <template v-if="mod < 0">{{mod}} {{ability}}</template>
                </span>
            </p>
            <div v-else>
                <p><strong>Ability Scores:</strong> <span class="cap">{{myRace.plural}}</span> gain a +2 bonus to one ability score of their choice.</p>
                <div class="content box-shadow text-center" style="margin-bottom: 1rem;">
                    <h4 class="ntm">Select an ability score.</h4>
                    <div class="radio-toolbar select-race__select-ability content">
                    <template v-for="(score, ability) in myRace.abilities">
                        <input 
                            v-model="freeAbility" 
                            :key="'select-free-' + ability + '-input'" 
                            type="radio" 
                            name="freeAbility" 
                            :id="'select-free-' + ability" 
                            :value="ability" 
                            @change="updateFreeAbility">
                        <label :for="'select-free-' + ability"  :key="'select-free-' + ability + '-label'">
                            <div>
                                {{ability}}
                            </div>
                        </label>
                    </template>
                </div>
                </div>
            </div>
            <p><strong>Size: </strong> {{myRace.size}} 
            
            <span v-if="myRace.size == 'Small'" class="caption"> <br>(Small creatures gain a +1 bonus to Armor Class (AC), a +1 bonus to attack rolls, a +4 bonus to Stealth checks, but a -1 penalty to Combat Manuever Bonus and Combat Manuever Defense)</span></p>
            <p><strong>Speed: </strong> {{myRace.speed}} feet</p>
            <p>
                <strong>Languages: </strong>
                <span v-for="language in myRace.languages" :key="'racial-language-' + language" class="csli">{{language}}</span>
            </p>
            <div v-if="intBonus > 0">
                <p>
                    <strong>Bonus Languages: </strong> 
                    Because {{name}} is so intelligent, you may select {{intBonus}} bonus {{ intBonus == 1 ? 'language' : 'languages' }} for {{pronouns.them}} to learn.
                </p>
                <div class="content box-shadow text-center">
                    <h4 class="ntm">Select up to {{intBonus}} bonus {{ intBonus == 1 ? 'language' : 'languages' }}.</h4>
                    <div class="checkbox-toolbar">
                        <span v-for="language in myRace.bonusLanguages" :key="'bonus-language-' + language">
                            <input 
                                type="checkbox" 
                                :id="'language-checkbox-' + language" 
                                :value="language" 
                                v-model="checkedLanguages" 
                                :disabled="checkedLanguages.length >= intBonus && checkedLanguages.indexOf( language ) === -1" 
                                @change="$emit( 'set-my-languages', myRace.languages.concat( checkedLanguages ) )"
                            >
                            <label :for="'language-checkbox-' + language">{{language}}</label>
                        </span>
                    </div>
                </div>
            </div>
            <h3>Racial Traits</h3>
            <template v-if="myRace.racialTraits && myRace.racialTraits.length > 0">
                <p v-for="trait in myRace.racialTraits" :key="'racial-trait-' + myRace.race + trait.name">
                    <strong>{{trait.name}}:</strong> {{trait.desc}}
                </p>
            </template>
        </div>
    </div>
</template>

<script>
import raceData from '../data/races.json';

export default {

    data: function () {
        return {
            myRace: null,
            races: raceData,
            freeAbility: "",
            checkedLanguages: []
        };
    },
    props: {
        propRace: Object,
        abilities: Object,
        name: String,
        pronouns: Object,
    },
    computed: {
        intBonus: function() {
            return Math.floor( ( this.abilities.intelligence - 10 ) / 2 );
        }
    },
     created() {
        if ( null != this.propRace) {
            this.myRace = this.propRace;
        }
    },
    methods: {
        isPositive: function ( value ) {
            return value > 0;
        },
        isNegative: function ( value ) {
            return value < 0;
        },
        updateRace: function() {
            this.checkedLanguages = [];
            this.freeAbility = null;
            this.$emit('set-race', this.myRace);
        },
        updateFreeAbility: function() {
            if ( this.myRace.freeAbility ) {
                for (let ability in this.myRace.abilities){
                    if(this.myRace.abilities.hasOwnProperty(ability)){
                        this.myRace.abilities[ability] = 0;
                    }
                }
                this.myRace.abilities[ this.freeAbility ] = 2;
            }
        }
    }
}
</script>

<style lang="scss">

.select-race {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;

    label {
        font-weight: normal;
        flex: 1 1 31%;
        display: relative;

        @media only screen and (max-width: 767px) {
            flex: 1 1 48%;
        }

        & > div {
            top: 100%;
            transform: translateY(-100%);
            position: relative;
            text-align: center;
            font-weight: bold;
            text-transform: capitalize;
        }
    }

    &__select-ability {
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;

        label {
        font-weight: normal;
        flex: 1 1 31%;
        display: relative;
        
        & > div {
            top: 100%;
            transform: translateY(-100%);
            position: relative;
            text-align: center;
            font-weight: bold;
            text-transform: capitalize;
        }
        }
    }

    &__image {
        margin-bottom: 1rem;
        width: 92px;
        height: auto;        
    }
}

.ability-bonuses > span {
    text-transform: capitalize;
}
</style>