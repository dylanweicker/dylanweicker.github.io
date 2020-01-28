<template>
    <div class="klass-specifics">
        <h3>Aura of Good</h3>
        <p>At level one, a paladin has a faint aura of good.</p>
        <h3>Detect Evil</h3>
        <p>{{name}} can, as a move action, concentrate on a single item or individual within 60 feet and determine if it is evil, learning the strength of its aura. While focusing on one individual or object, {{name}} cannot detect evil in any other object or individual within range. {{name}} may use this ability any number of times per day.</p>
        <h3>Smite Evil</h3>
        <p>Once per day, as a swift action, {{name}} may choose a target within sight to smite. If the target is not evil, the smite is wasted with no effect. Otherwise, the smite remains in effect until the target is dead or {{name}} rests.</p>
        <p><b>Offense:</b> </p>
        <li data-toggle="tooltip" data-placement="top" title="This bonus is equal to your charisma modifier.">+{{charisma}} to attack rolls against the target</li> 
        <li data-toggle="tooltip" data-placement="top" title="This bonus is equal to your paladin level.">+1 to damage rolls against the target.</li> 
        <li>This bonus damage is doubled on the first successful attack if the target is an outsider, dragon, or undead.</li>
        <li>Bypass all damage resistance (DR) the target might possess.</li>
        <p><b>Defense:</b> </p>
        <li data-toggle="tooltip" data-placement="top" title="This bonus is equal to your Charisma modifier">+{{charisma}} deflection bonus to AC against attacks made by the target.</li>
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
        charisma: function() {
            var bonus = Math.floor( ( this.abilities.charisma - 10 ) / 2 );
            if ( bonus > 0 ) {
                return bonus;
            } else {
                return 0;
            }
        }
    },
}
</script>