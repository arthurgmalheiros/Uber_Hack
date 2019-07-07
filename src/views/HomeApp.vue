<template>
    <div class="home">
        <div class="header">
            <p class="header-title">EVENTOS</p>
        </div>
        <!-- <div class="row margin-bottom-35 homeTabs">
            <ul class="tabs">
                <li class="tab"><a>Todos</a></li>
                <li class="tab"><a>Eu vou</a></li>
            </ul>
        </div> -->
        
    </div>
</template>

<style>
.tabs {
    display: inline-block;
}
.tabs .tab a {
    color: #828282 !important;
    font-size: 1.15em !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif bold;
    text-transform: capitalize!important;
}
.tabs{
    border-bottom: 1px solid #d2d2d2;
}
.tabs .tab a:hover,
.tabs .tab a.active {
    color: #333333 !important;
    font-weight: 500 !important;
    border-bottom: 5px solid rgba(45, 104, 196, 0.9)!important;
}
.tabs .tab a:focus {
    background-color: rgba(236, 241, 249, 0) !important;
}
.header {
    height: 50px;
}
.header-title {
    font-size: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding-bottom: 20px;
    border-bottom: 1px solid lightgray;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ 
})

export default class HomeApp extends Vue {
}
</script>
