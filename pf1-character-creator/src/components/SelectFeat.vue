
<template>
    <div id="select-feats" class="main-col-content">
        <div class="content">
            <h2 class="section-header">Take a feat!</h2>
            <p>At level one, all adventurers gain a feat<span v-if="race.race === 'human'">. Since {{name}} is a human, {{pronouns.they}} may select one additional feat</span>!</p>
        </div>
        <div class="content text-center box-shadow">
            <h4>Select {{maxFeats}} {{maxFeats > 1 ? 'feats' : 'feat'}} from any {{maxFeats > 1 ? 'categories' : 'category'}}.</h4>
            <h3>Combat Feats</h3>
            <div class="checkbox-toolbar">
                <span v-for="feat in featList.combat" :key="'feat-' + feat.name">
                    <input 
                        type="checkbox" 
                        :id="'feat-checkbox-' + feat.name" 
                        :value="feat" 
                        v-model="checkedFeats" 
                        :disabled="checkedFeats.length >= maxFeats && checkedFeats.indexOf( feat ) === -1" 
                        @change="$emit( 'set-my-feats', checkedFeats )"
                    >
                    <label :for="'feat-checkbox-' + feat.name" class="feat-checkbox"><b>{{feat.name}}</b><br>{{feat.desc}}</label>
                </span>
            </div>
            <h3>Skill Feats</h3>
            <div class="checkbox-toolbar">
                <span v-for="feat in featList.skill" :key="'feat-' + feat.name">
                    <input 
                        type="checkbox" 
                        :id="'feat-checkbox-' + feat.name" 
                        :value="feat" 
                        v-model="checkedFeats" 
                        :disabled="checkedFeats.length >= maxFeats && checkedFeats.indexOf( feat ) === -1" 
                        @change="$emit( 'set-my-feats', checkedFeats )"
                    >
                    <label :for="'feat-checkbox-' + feat.name" class="feat-checkbox"><b>{{feat.name}}</b><br>{{feat.desc}}</label>
                </span>
            </div>

        </div>
    </div>
</template>

<script>
import featData from '../data/feats.json';

export default {

    data: function () {
        return {
            featList: featData,
            checkedFeats: []
        };
    },
    props: {
        race: Object,
        klass: Object,
        abilities: Object,
        name: String,
        pronouns: Object,
    },
    computed: {
        maxFeats: function() {
            return (this.race.race === 'human') ? 2 : 1;
        }
    },
    methods: {

    }
       
}
</script>

<style lang="scss">
th {
    text-align: center;
}

.checkbox-toolbar{
    align-items: flex-start;
}

.feat-checkbox{
    width: 31%;
    min-height: 118px;
    font-weight: 400;


    b{
        font-weight: 700;
        font-size: 18px;
    }
}
</style>