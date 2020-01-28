
<template>
    <div id="select-equipment" class="main-col-content">
        <div class="content">
            <h2 class="section-header">Pick out some equipment for your hero!</h2>
            <h3>Gold: {{gold}}</h3>
            <h3>Weapons</h3>
            <h3>Armor</h3>
                <div class="radio-toolbar select-armor content">
                    <template v-for="armor in armors">
                        <input 
                            v-model="deity" 
                            :key="armor.name + '-input'" 
                            type="radio" 
                            :name="armor.name + '-input'" 
                            :id="'select-deity-' + deityName" 
                            :value="myArmor" 
                            @change="updateArmor"
                        >
                        <label :key="armor.name + '-input'" for="armor.name + '-input'">
                            <b>{{armor.name}}</b><br>                    
                            <b>Armor Bonus</b> {{armor.bonus}}<br>
                            <b>Max Dex</b> {{armor.dex}}<br>
                            <b>Type</b> {{armor.type}}<br>
                            <b>Cost</b> {{armor.cost}}gp<br>
                            <b>Armor Check Penality</b> {{armor.acp}}
                            <b>Weight</b> {{armor.weight}}
                        </label>
                    </template>
                </div>
            <h3>Sheild</h3>
            <h3>Gear</h3>
        </div>
    </div>
</template>

<script>
import armorData from '../data/armor.json';

export default {

    data: function() {
        return {
            armors: armorData,
            myArmor: {}
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
        gold: function() {
            let gold = this.klass.gold;
            let armor = this.myArmor ? this.myArmor.cost : 0;
            return gold - armor;
        }
    },
    methods: {
        updatArmor: function() {
        }
    } 
}
</script>

<style lang="scss">
</style>