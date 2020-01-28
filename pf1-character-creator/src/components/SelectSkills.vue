
<template>
    <div id="select-abilities" class="main-col-content">
        <div class="content">
            <h2 class="section-header">Go ahead and train your skills!</h2>
            <p>Skills represent some of the most basic and yet most fundamental abilities {{name}} possesses. As {{name}} advances in level, {{pronouns.they}} can gain new skills and improve {{pronouns.their}} existing skills dramatically. </p>
            <p>Your class has a number of favored skills, called class skills. These are marked with a green checkmark. It is easier for {{name}} to become more proficient in these skills, as they represent part of {{pronouns.their}} professional training and constant practice. You gain a +3 bonus on all class skills that you put ranks into. </p>
            <p>You have {{skillPoints}} points to spend on your skills.</p>
        </div>
         <div class="content box-shadow text-center">
            <div class="row">
                <table class="skill-controls">
                    <tr class="skill-controls__headings text-center">
                        <th class="text-left">Skill</th>
                        <th>Class Skill</th>
                        <th>Ability</th>
                        <th>Mod</th>
                        <th>Misc.</th>
                        <th>Trained?</th>
                        <th>Total</th>
                    </tr>
                    <template v-for="(skill, skillName) in skillList">
                    <tr class="skill-control text-center" :key="'skill-' + skillName">
                        <td class="skill-control__name"><div>{{skillName}}</div></td>
                        <td>            
                            <div v-if="isKlassSkill( skillName )" style="color:#060;">                
                                <font-awesome-icon  :icon="['far', 'check-circle']" size="2x"/>
                            </div>
                            <div v-else style="color:#ccc;">
                                <font-awesome-icon :icon="['far', 'times-circle']" size="2x"/>
                            </div>
                        
                        </td>
                        <td class="cap">{{skill.ability.substring(0,3)}} 
                        <td>{{calcBonus(abilities[skill.ability])}}</td>
                        <td>0</td>
                        <td>
                            <div class="pretty p-icon p-curve p-pulse" style="font-size: 2rem;">
                                <input type="checkbox" 
                                :value="language" 
                                v-model="checkedLanguages" 
                                :disabled="trainedSkills.length >= skillPoints && trainedSkills.indexOf( skill ) === -1" />
                                <div class="state">
                                    <i class="icon mdi mdi-check"></i>
                                    <label></label>
                                </div>
                            </div>
                        </td>
                        <td><b>{{calcSkill(skill)}}</b></td>
                    </tr>
                    </template>
                </table>
            </div>
         </div>
    </div>
</template>

<script>
import skillData from '../data/skills.json';

export default {

    data: function () {
        return {
            skillList: skillData,
            trainedSkills: []
        };
    },
    props: {
        skillPoints: 0,
        race: Object,
        klass: Object,
        abilities: Object,
        name: String,
        pronouns: Object,
    },
    computed: {
    },
    methods: {
        calcBonus: function( score ) {
            var bonus = Math.floor( ( score - 10 ) / 2 );
            if ( bonus > 0 ) {
                return '+' + bonus;
            } else {
                return bonus;
            }
        },
        calcSkill: function( skill ) {
            let abilityBonus =  this.calcBonus(this.abilities[skill.ability]);
            let raceBonus = 0;
            let klassBonus = 0;
            let klassSkill = this.isKlassSkill(skill.name);
            let trained = this.trainedSkills.indexOf( skill ) > -1;

            let bonus = abilityBonus + raceBonus + klassBonus;
            if (trained) {
                bonus = klassSkill ? bonus + 4 : bonus + 1;
            }
            return bonus;
        },
        isKlassSkill: function( skillName ) {
            return this.klass.classSkills.includes( skillName );
        }
    }
       
}
</script>

<style lang="scss">
th {
    text-align: center;
}

.skill-controls{
    width: 100%;
}

.skill-control {
    
    & td {
        padding: .5rem 0;
    }

    &__name {
        text-align: left;
        font-size: 1.8rem;

        div {
            margin-left: 1rem;
        }
    }

    &:nth-child(even){
        background: #eee;
    }
}

.pretty .state .label{

    &:before, &:after {
        top: calc(50%);
        transform: translateY(-50%);
    }
}

.pretty input:checked ~ .state label:after {
    background-color: var(--light-color);
}

</style>