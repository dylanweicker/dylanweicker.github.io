
<template>
    <div id="select-abilities" class="main-col-content">
        <div class="content">
            <h2 class="section-header">Which class do you favor?</h2>
            <p>{{name}}'s class is one of {{pronouns.their}} most defining features. It's the source of most of {{pronouns.their}} abilities and gives {{pronouns.them}} a specific role in any adventuring party.</p>
        </div>
        <div class="content box-shadow text-center">
            <h4 class="ntm">Select a class.</h4>
            <div class="radio-toolbar select-race content">
                <template v-for="(klass, klassName) in klasses">
                    <input 
                        v-model="myKlass" 
                        :key="klassName + '-input'" 
                        type="radio" 
                        name="class" 
                        :id="'select-class-' + klassName" 
                        :value="klass" 
                        @change="updateKlass">
                    <label :for="'select-class-' + klassName"  :key="klassName">
                        <div>
                            <img class="select-race__image" :src="'src/assets/' + klass.image"><br>
                            {{klass.name}}
                        </div>
                    </label>
                </template>
            </div>
        </div>

        <div v-if="myKlass" class="content">
            <h2 class="klass-title cap">{{myKlass.name}}</h2>
            <p>{{myKlass.description}}</p>
            <h3>Standard Traits</h3>
            <div class="std-klass-traits">
                <p class="std-klass-trait">
                    <strong  data-placement="top" data-toggle="tooltip" :title="'The amount of damage ' + name + ' can take'">Hit Points</strong>
                    <span  data-placement="top" data-toggle="tooltip" title="This value includes your Constitution modifier.">
                        {{hp}}
                    </span>
                </p>
                <p class="std-klass-trait">
                    <strong data-placement="top" data-toggle="tooltip" :title="'The accuracy of ' + pronouns.their + ' hand-to-hand attacks'">Melee Attack Bonus:</strong>
                    <span data-placement="top" data-toggle="tooltip" title="This value includes your Strength modifier.">
                        {{mab}}
                    </span>
                </p>
                <p class="std-klass-trait">
                    <strong data-placement="top" data-toggle="tooltip" :title="'The accuracy of ' + pronouns.their + ' ranged attacks'">Ranged Attack Bonus:</strong>
                    <span data-placement="top" data-toggle="tooltip" title="This value includes your Dexterity modifier.">
                        {{rab}}
                    </span>
                </p>
            </div>
            <div class="std-klass-traits">
                <p class="std-klass-trait" data-placement="top" data-toggle="tooltip" title="">
                    <strong>Reflex:</strong>
                    <span data-placement="top" data-toggle="tooltip" title="This value includes your Dexterity modifier.">
                        {{ref}}
                    </span>
                </p>
                <p class="std-klass-trait">
                    <strong data-placement="top" data-toggle="tooltip" title="">Fortitude:</strong>
                    <span data-placement="top" data-toggle="tooltip" title="This value includes your Constitution modifier.">
                        {{fort}}
                    </span>
                </p>
                <p class="std-klass-trait">
                    <strong data-placement="top" data-toggle="tooltip" title="">Will:</strong>
                    <span data-placement="top" data-toggle="tooltip" title="This value includes your Wisdom modifier.">
                        {{will}}
                    </span>
                </p>
            </div>
            <div class="std-klass-traits">
                <p class="std-klass-trait">
                    <strong data-placement="top" data-toggle="tooltip" title="You will be able to train this number of skills.">Skill Points:</strong>
                    <span data-placement="top" data-toggle="tooltip" title="This value includes your Intelligence modifier.">
                        {{skillPoints}}
                    </span>
                </p>
                <p class="std-klass-trait std-klass-trait--class-skills">
                    <strong data-placement="top" data-toggle="tooltip" title="If you train any of these skills, you will gain an additional +3 bonus in that skill.">Class Skills:</strong>
                    <span class="no-hover">
                        <span v-for="skill in myKlass.classSkills" :key="skill" class="csli">
                            {{skill}}</span>
                    </span>
                </p>
            </div>
            <div class="std-klass-traits">
                <p class="std-klass-trait">
                    <strong data-placement="top" data-toggle="tooltip" title="You will be able to spend this on equipment.">Starting Wealth:</strong>
                    <span class="no-hover">
                        {{myKlass.gold}} gold pieces
                    </span>
                </p>
            </div>
            <h3>Weapon and Armor Proficiencies</h3>
                    <p>{{myKlass.proficiencyDescription}}</p>
            
            <fighter v-if="myKlass.name == 'Fighter'"></fighter>
            <rogue v-if="myKlass.name == 'Rogue'"></rogue>
            <paladin 
                v-if="myKlass.name == 'Paladin'" 
                :name="name" 
                :pronouns="pronouns" 
                :abilities="abilities" >
            </paladin>
            <cleric 
                v-if="myKlass.name == 'Cleric'"
                @set-deity="setDeity"
                @set-domains="setDomains"
                :name="name" 
                :pronouns="pronouns" 
                :abilities="abilities"
                >
            </cleric>
            <sorcerer v-if="myKlass.name == 'Sorcerer'"></sorcerer>
            <wizard 
                v-if="myKlass.name == 'Wizard'"
                :name="name" 
                :pronouns="pronouns" 
                :abilities="abilities">
            </wizard>

            <h3>Favoured Class Bonus</h3>
            <p>
                {{myKlass.name}} is {{name}}'s' favoured class. At first level and each time {{name}} levels up in this class {{pronouns.they}} will gain either a bonus hit point or a bonus skill point.
            </p>
            <div class="content box-shadow text-center">
                <h4 class="ntm">Select a Favoured Class Bonus</h4>
                <div class="radio-toolbar content">
                    <input 
                        v-model="favouredKlass"
                        type="radio" 
                        name="favoured-klass-hp" 
                        id="favoured-klass-hp" 
                        value="hp" 
                        @change="$emit('set-favoured-klass', favouredKlass)">
                    <label for="favoured-klass-hp">Bonus Hit Points
                    </label>
                    <input 
                        v-model="favouredKlass"
                        type="radio" 
                        name="favoured-klass-sp" 
                        id="favoured-klass-sp" 
                        value="sp" 
                        @change="$emit('set-favoured-klass', favouredKlass)">
                    <label for="favoured-klass-sp">Bonus Skill Point
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import klassData from '../data/klasses.json';
import Fighter from './klasses/Fighter.vue';
import Rogue from './klasses/Rogue.vue';
import Paladin from './klasses/Paladin.vue';
import Cleric from './klasses/Cleric.vue';
import Sorcerer from './klasses/Sorcerer.vue';
import Wizard from './klasses/Wizard.vue';

export default {

    data: function () {
        return {
            myKlass: null,
            klasses: klassData,
            favouredKlass: ''
        };
    },
    props: {
        propKlass: Object,
        abilities: Object,
        race: Object,
        name: String,
        pronouns: Object,
    },
    components: {
        Fighter,
        Rogue,
        Paladin,
        Cleric,
        Sorcerer,
        Wizard,
    },
     created() {
        if ( null != this.propKlass) {
            this.myKlass = this.propKlass;
        }
    },
    computed: {
        hp: function () {
            let hp = parseInt(this.myKlass.hp) + parseInt(this.calcBonus(this.abilities.constitution));
            return ( 'hp' === this.favouredKlass ) ? hp + 1 : hp;
        },
        mab: function() {
            let mab = parseInt(this.myKlass.bab) + parseInt(this.calcBonus(this.abilities.strength));
            if ( mab > 0) {
                return '+' + mab;
            }
            else {
                return mab;
            }
        },
        rab: function() {
            let rab = parseInt(this.myKlass.bab) + parseInt(this.calcBonus(this.abilities.dexterity));
            if ( rab > 0) {
                return '+' + rab;
            }
            else {
                return rab;
            }
        },
        ref: function() {
            let racialBonus = this.race.bonuses.saves ? this.race.bonuses.saves : 0;
            let ref = parseInt(this.myKlass.ref) + parseInt(this.calcBonus(this.abilities.dexterity)) + racialBonus;
            if ( ref > 0) {
                return '+' + ref;
            }
            else {
                return ref;
            }
        },
        fort: function() {
            let racialBonus = this.race.bonuses.saves ? this.race.bonuses.saves : 0;
            let fort = parseInt(this.myKlass.fort) + parseInt(this.calcBonus(this.abilities.constitution)) + racialBonus;
            if ( fort > 0) {
                return '+' + fort;
            }
            else {
                return fort;
            }
        },
        will: function() {
            let racialBonus = this.race.bonuses.saves ? this.race.bonuses.saves : 0;
            let will = parseInt(this.myKlass.will) + parseInt(this.calcBonus(this.abilities.wisdom)) + racialBonus;
            if ( will > 0) {
                return '+' + will;
            }
            else {
                return will;
            }
        },
        skillPoints: function() {
            let skills = parseInt(this.myKlass.skillPoints) + parseInt(this.calcBonus(this.abilities.intelligence));
            skills = ('human' === this.race.race) ? skills + 1 : skills;
            if ( skills > 0) {
                return ( 'sp' === this.favouredKlass ) ? skills + 1 : skills;
            }
            else {
                return ( 'sp' === this.favouredKlass ) ? 2 : 1;
            }
        },
    },
    methods: {
        updateKlass: function() {
            this.$emit('set-klass', this.myKlass);
        },
        calcBonus: function( score ) {
            var bonus = Math.floor( ( score - 10 ) / 2 );
            if ( bonus > 0 ) {
                return '+' + bonus;
            } else {
                return bonus;
            }
        },
        setDeity: function( value ) {
            this.myKlass.deity = value;
            this.updateKlass;
        },
        setDomains: function( value ) {
            this.myKlass.domains = value;
            this.updateKlass;
        },
    }
}
</script>

<style lang="scss">

.std-klass-traits {
    display: flex;
    justify-content: space-between;
    text-align: left;

    .std-klass-trait {
        flex: 1 1 31%;

        > *:hover {
            background: var(--secondary-color-light);
        }
    }

    .std-klass-trait--class-skills {
        flex: 1 1 64%;
        display: flex;

        > strong {
            min-width: 80px;
        }
    }

    .no-hover:hover {
        background: white;
    }
}

</style>