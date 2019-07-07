<template>
    <div class="headerModality">
        <div class="backPage ajuste">
            <div style="display: flex; justify-content: center; flex-direction: column; ">
                <i v-on:click="click" class="material-icons">arrow_back</i>
            </div>
        </div>
        
        <div class="titlePage">
            <div class="sun">
                <span class="titleHeader">{{title}}</span>
                <span class="display-none hitBox"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    props: {desiredScrollTop: String, click: Function, title: String, iconButtonOne: String, iconButtonTwo: String, showButtonOne: String, showButtonTwo: String, clickButtonOne: String, clickButtonTwo: String},
    components: { }
})

export default class HeaderModality extends Vue {

    mounted() {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', this.scroll);
    }

    beforeDestroy() {
        /* Removendo event listener ao sair da tela */
        const w:any = window;
        if (w.removeEventListener) { 
            w.removeEventListener('scroll', this.scroll);
        } else if (w.detachEvent) {
            w.detachEvent('scroll', this.scroll);
        } else {}
    }

    scroll(event: any) {
        const nav: any = document.querySelector('.headerModality');
        const categoryName: any = document.querySelector('.titleHeader');
        const hide: any = document.querySelector('.hitBox');
        // const titleInsideHeader: any = document.querySelector('.titleJoinedHeader');
        const w: any = window;
        if (nav) {
            if(w.pageYOffset >= this.$props.desiredScrollTop) {
                categoryName.classList.add('fixed');
                hide.classList.remove('display-none');
                // titleInsideHeader.classList.remove('display-none');
            } else {
                categoryName.classList.remove('fixed');
                hide.classList.add('display-none');
                // titleInsideHeader.classList.add('display-none');
            }
        }
    }
}

</script>

<style>

    .joinHeader{
        position: fixed;
        top: 0;
        margin-left: 30px !important;
        font-weight: normal;
        z-index: 1000001;
    }

    .headerModality{
        position: sticky;
        width: 100%;
        top: 0;
        z-index: 9999999999;
    }

    .titleHere{
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-right: auto;
        margin-left: 10px;
        font-size: 1.2rem;
        font-weight: 300;
        transition: .4s;
    }

    .titleJoinedHeader{
        transition: .4s;
    }

    .titlePage{
        transition: .4s;
    }

    .backPage.ajuste{
        height: 70px;
        flex-direction: initial;
        justify-content: initial;
    }

    .fixed{
        margin: 20px 35px 20px !important;
        position: fixed;
        margin-right: auto;
        margin-left: 20px;
        font-size: 1.3rem;
        font-weight: 300;
        transition: .6s;
        top: 0;
        z-index: 999999;
        margin: 23px 35px 20px !important;
    }

    .fixed > .titlePage > .sun{
        font-size: 1.3rem;
    }

    .titleHeader{
        transition: .2s;
    }

    .hitBox{
        height: 30px !important;
    }

    .favorite{
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }
</style>
