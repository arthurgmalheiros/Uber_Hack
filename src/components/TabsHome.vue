<template>
    <div class="row margin-bottom-35 homeTabs" style="padding:0 15px;">
        <ul id="tabs" :class="(hideTabsMargin ? '' : 'tabs ') + classDiv" v-on:click="onTabChange ? onTabChange() : function() { }">
            <li class="tab col s3" v-for="count in counts" :key="count.id">
                <a :id="'tab_'+removeSpecialCharacters(count.NAME)" :href="'#'+removeSpecialCharacters(count.NAME)">{{count.NAME}}</a>
            </li>
        </ul>
        <div :id="removeSpecialCharacters(count.NAME)" class="" v-for="count in counts" :key="count.id" style="width:100%;">
            <slot :name="count.NAME">
            </slot>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    props: {classDiv: String, NAME : String, counts: Array, onTabChange: Function, hideTabsMargin: Boolean }
})

export default class TabsHome extends Vue {
    removeSpecialCharacters(s: string) {
        s = s ? s.toLowerCase() : '';
        s = s.toLowerCase();
        s = s.replace(new RegExp(/\s/g),'_');
        s = s.replace(new RegExp(/[Ã Ã¡Ã¢Ã£Ã¤Ã¥]/g),'a');
        s = s.replace(new RegExp(/Ã¦/g),'ae');
        s = s.replace(new RegExp(/Ã§/g),'c');
        s = s.replace(new RegExp(/[Ã¨Ã©ÃªÃ«]/g),'e');
        s = s.replace(new RegExp(/[Ã¬Ã­Ã®Ã¯]/g),'i');
        s = s.replace(new RegExp(/Ã±/g),'n');                
        s = s.replace(new RegExp(/[Ã²Ã³Ã´ÃµÃ¶]/g),'o');
        s = s.replace(new RegExp(/Å“/g),'oe');
        s = s.replace(new RegExp(/[Ã¹ÃºÃ»Ã¼]/g),'u');
        s = s.replace(new RegExp(/[Ã½Ã¿]/g),'y');
        s = s.replace(new RegExp(/\W/g),'');
        return s;
    }
}
</script>