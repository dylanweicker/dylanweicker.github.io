
<template>
    <div id="select-equipment" class="main-col-content">
        <div class="content">
            <h2 class="section-header">We just need a few finishing touches!</h2>
            <h3>Alignment</h3>
            <p>In pathfinder, a creature’s general moral and personal attitudes are represented by its alignment. All creatures in pathfinder have an alignment and alignment determines the effectiveness of some spells and magic items. Alignments have two axes: good to evil, and lawful to chaotic.
            <p><b>Good vs Evil: </b>Good characters protect innocent life. Evil characters and creatures debase or destroy innocent life, whether for fun or profit.</p>
            <p><b>Lawful vs Chaotic:</b> Lawful characters tell the truth, keep their word, respect authority, honor tradition, and judge those who fall short of their duties. Chaotic characters follow their consciences, resent being told what to do, favor new ideas over tradition, and do what they promise if they feel like it.</p>
        </div>
        <div class="content box-shadow text-center">
            <h4 class="ntm">Select an Alignment.</h4>
        </div>
        <div class="content">
            <h3>Height and Weight</h3>
            <h3>Hair, Eye, and Skin Colour</h3>
            <label for="hair">Hair</label>
            <select name="hair">
                <option value="black" style="background: black; color: white;">Black</option>
                <option value="grey"  style="background: #777; color: white;">Grey</option>
                <option value="silver"  style="background: #ddd;">Silver</option>
                <option value="white">White</option>
                <option value="blonde" style="background: #fc6;">Blonde</option>
                <option value="gold" style="background: #fa0;">Gold</option>
                <option value="light-brown" style="background: #963; color: white;">Light Brown</option>
                <option value="brown" style="background: #630; color: white;">Brown</option>
                <option value="dark-brown" style="background: #310; color: white;">Dark Brown</option>
                <option value="red" style="background: #f50; color: white;">Red</option>
                <option value="blue" style="background: #09f; color: white;">Blue</option>
                <option value="green" style="background: #060; color: white;">Green</option>
                <option value="purple" style="background: #c0c; color: white;">Purple</option>
                <option value="none">None</option>
            </select>
            <h3>Positive Traits</h3>
                <textarea></textarea>
            <h3>Flaws</h3>
                <textarea></textarea>
            <h3>Quirks</h3>
                <textarea></textarea>
            <h3>Backstory</h3>
                <textarea></textarea>
        </div>
    </div>
</template>

<script>

export default {

    data: function () {
        return {
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
    },
    methods: {
    }
       
}
</script>

<style lang="scss">
</style>