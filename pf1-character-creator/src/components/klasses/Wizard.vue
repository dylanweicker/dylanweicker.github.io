<template>
    <div class="klass-specifics">
        <h3>School</h3>
        <p>Wizards choose one school of magic to specialize in.</p>
        <h3>Cantrips</h3>
        <p>{{name}} begins knowing all the cantrips (level 0 spells) except those belonging to {{pronouns.their}} opposition schools. A level one wizard may prepare 3 different cantrips per day. Cantrips are not expended when cast, so these cantrips can be cast any number of times on the day that they are prepared.</p>
        <p> Once learned, {{name}} can prepare a cantrip from an opposition school, but it uses up two of {{pronouns.their}} preperation slots.</p>
        <h3>Spell Casting</h3>
        <h3>Arcane Bond</h3>
        <h3>Scribe Scroll</h3>
        <p>{{name}} can create a scroll of any spell that is in {{pronouns.their}} spellbook. Scribing a cantrip costs 6.25gp of raw materials and scribing a level one spell costs 12.5gp scroll. Scribing either type of scroll takes 2 hours.</p>
        

    </div>
</template>

<script>
export default {
    props: {
        abilities: Object,
        name: String,
        pronouns: Object,
    },
    computed: {
        intelligence: function() {
            var bonus = Math.floor( ( this.abilities.intelligence - 10 ) / 2 );
            if ( bonus > 0 ) {
                return bonus;
            } else {
                return 0;
            }
        }
    },
}
</script>