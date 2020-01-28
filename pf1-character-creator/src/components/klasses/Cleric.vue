<template>
    <div class="klass-specifics">
        <h3>Deity</h3>
        <p>Clerics gain most of their power from their deity. Their deity influences their alignment, what magic she can perform, her values, and how others see her.</p>
        <div class="box-shadow">
            <div class="row">
                <div class="col-md-6">
                    <div class="radio-toolbar select-deity content">
                    <template v-for="(deityData, deityName) in deities">
                            <input 
                                v-model="deity" 
                                :key="deityName + '-input'" 
                                type="radio" 
                                name="class" 
                                :id="'select-deity-' + deityName" 
                                :value="deityData" 
                                @change="updateDeity">
                            <label :for="'select-deity-' + deityName"  :key="deityName" class="select-deity-input">
                                <div>
                                    <img class="select-deity__image" :src="'src/assets/' + deityData.image" style="height: 72px; margin: auto;"><br>
                                    {{deityData.name}}
                                </div>
                            </label>
                    </template>
                    </div>
                </div>
                <div class="col-md-6">
                    <template v-if="deity">
                        <h2>{{deity.name}}</h2>
                        <p>{{description}}</p>
                        <p><b>Alignment:</b> {{deity.alignment}}</p>
                        <p><b>Portfolio:</b>  {{deity.portfolio}}</p>
                        <p><b>Followers:</b>  {{deity.followers}}</p>
                        <p><b>Domains:</b>  
                        <span
                            v-for="domain in deity.domains" 
                            :key="domain"
                            class="csli"
                        >{{domain}}
                        </span>
                        <p><b>Favoured Weapon:</b>  {{deity.weapon}}</p>
                    </template>
                    <template v-else>
                        <p class="text-center">Select a deity to the right to read more information...</p>
                    </template>
                </div>
            </div>
        </div>
        <h3>Domains</h3>
        <p>{{name}} chooses two domains from among those belonging to {{pronouns.their}} deity. At level one, each domain grants a domain power, as well as a bonus spell. Each day you can select one of your two domain spells to prepare for that day.</p>
        <div class="box-shadow content">
            <h4 class="ntm">Select 2 Domains.</h4>
            <div v-if="deity" class="checkbox-toolbar select-domain content">
                <template v-for="domain in deity.domains">
                        <input 
                            v-model="domains" 
                            :key="domain + '-input'" 
                            type="checkbox" 
                            name="class" 
                            :id="'select-domain-' + domain" 
                            :value="domain" 
                            :disabled="domains.length >= 2 && domains.indexOf( domain ) === -1" 
                            @change="updateDomains">
                        <label :for="'select-domain-' + domain"  :key="domain + '-label'">
                            <div>
                                {{domain}}
                            </div>
                        </label>
                </template>
            </div>
            <div v-else><p>Select a Deity before selecing a Domain.</p></div>

        </div>
        <h3>Channel Energy</h3>
        <div class="box-shadow content">
            <h4 class="ntm">Select an energy type to channel</h4>
        </div>
        <h3>Orisons</h3>
        <h3>Spell Casting</h3>
        <p>{{name}} casts divine spells which are drawn from the cleric spell list. {{name}} knows all the level one spells. {{pronouns.they}} must choose and prepare {{pronouns.their}} spells in advance each day.</p>

        <p>Like other spellcasters, a cleric can cast only a certain number of spells of each spell level per day. Because of {{name}}'s wisdom score, {{pronouns.they}} can cast {{1 + ( calcBonus('wisdom') % 4 ) }} spells per day (not including the bonus domain spell).</p>

        <p>The Difficulty Class for a saving throw against {{name}}'s level one spells is {{calcBonus('wisdom') + 11}}</p>

        <!--Accordion wrapper-->
        <div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">

            <!-- Accordion card -->
            <div class="card">

                <!-- Card header -->
                <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true"
                    aria-controls="collapseOne1">
                <div class="card-header" role="tab" id="headingOne1">
                
                    <h4 class="mb-0">
                    Cleric Spell List
                    </h4>
                    <font-awesome-icon  :icon="['fas', 'angle-down']" size="2x"/>
                </div>
                </a>

                <!-- Card body -->
                <div id="collapseOne1" class="collapse collapsed-content" role="tabpanel" aria-labelledby="headingOne1"
                data-parent="#accordionEx">
                    <div class="card-body">
                        <div v-for="spell in spells" :key="spell.name" class="">
                            <b>{{spell.name}}:</b> {{spell.desc}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <h3>Spontaneous Casting</h3>
    </div>
</template>

<script>
import deities from '../../data/deities.json';
import clericSpells from '../../data/clericSpells.json';

export default {
    data: function () {
        return {
            deity: null,
            deities: deities,
            domains: [],
            spells: clericSpells
        };
    },
    props: {
        abilities: Object,
        name: String,
        pronouns: Object,
    },
    methods: {
        updateDeity: function () {
            this.domains = [];
            this.$emit('set-deity', this.deity);
        },
        updateDomains: function () {
            this.$emit('set-domains', this.domains);
        },
        calcBonus: function( ability ) {
            var score = this.abilities[ability];
            console.log(score);
            var bonus = Math.floor( ( score - 10 ) / 2 );
            return bonus;
        },
    }
}
</script>

<style lang="scss">
    .select-deity-input {
        width: 45%;
        text-align: center;
    }

    .accordion {

        a {
            text-decoration: none;
        }

        .card-header {
            padding: 1rem;
            color: var(--light-color);
            display: flex;
            justify-content: space-between;
            box-shadow: 0px 0.4px 1.2rem rgba(0,0,0,0.2);

            &:hover {
                color: var(--primary-color);
                text-decoration: none;
            }

            h4 {
                display: inline;
                text-decoration: none;
                margin: 0;
                line-height: 0.8;
            }
        }
    }

    .collapsed-content {
        background-color: var(--secondary-color-lighter);
        padding: 1rem;
        z-index: -1;
        box-shadow: 0px 0.4rem 4px rgba(0,0,0,0.2) inset;
    }
</style>