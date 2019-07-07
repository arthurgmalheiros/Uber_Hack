<template>
    <ul :class="'row margin-bottom-7 '+typeList">
        <slot name="options">
        </slot>
    </ul>
</template>


<script lang="ts" >
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    props: { typeList: String }
})

export default class ListDefault extends Vue {

    iconColor(item: any, lists: any) {
        setTimeout(function() {
            //var numero = idIcon % 10
            //document.getElementById(idIcon).className += " color" + numero;
            //document.getElementById(item.id).className += " color" + lists.indexOf(list);
            let pos = lists.findIndex((i : any) => i.id === item.id) + 1;
            const num = pos % 10;

            const el: HTMLElement | null = document.getElementById(pos);

            if (el) {
                const el2: HTMLElement = el;
                el2.className += " color" + num;
            }

        }, 1);
    }

}
</script>