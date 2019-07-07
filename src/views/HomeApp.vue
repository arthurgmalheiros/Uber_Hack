<template>
    <div class="home">
        <div class="header">
            <p class="header-title">EVENTOS</p>
        </div>
        <div class="row margin-bottom-35 homeTabs">
            <ul class="tabs">
                <li class="tab"><a>Todos</a></li>
            </ul>
        </div>
        <div class="events">
            <div class="card" v-on:click="clickEvent(eventId)">
                <div class="card-event">
                    <span class="card-title" style="padding:20px;">Olhos D'Agua</span>
                    <img src="../assets/car.svg"/>
                    <p class="card-info">Rua Henrique</p>
                    <p class="card-date">Hoje de 05:00 às 07:00</p>
                </div>
            </div>
            <div class="card" v-on:click="clickEvent(eventId)">
                <div class="card-event">
                    <span class="card-title" style="padding:20px;">Olhos D'Agua</span>
                    <img src="../assets/car (2).svg"/>
                    <p class="card-info">Rua Henrique</p>
                    <p class="card-date">Hoje de 05:00 às 07:00</p>
                </div>
            </div>
            <div class="card" v-on:click="clickEvent(eventId)">
                <div class="card-event">
                    <span class="card-title" style="padding:20px;">Olhos D'Agua</span>
                    <img src="../assets/car (1).svg"/>
                    <p class="card-info">Rua Henrique</p>
                    <p class="card-date">Hoje de 05:00 às 07:00</p>
                </div>
            </div>
            <div class="card" v-on:click="clickEvent(eventId)">
                <div class="card-event">
                    <span class="card-title" style="padding:20px;">Olhos D'Agua</span>
                    <img src="../assets/car.svg"/>
                    <p class="card-info">Rua Henrique</p>
                    <p class="card-date">Hoje de 05:00 às 07:00</p>
                </div>
            </div>
        </div>

    </div>
</template>

<style>
.card-event {
    margin-bottom:20px!important;
}
.events {
    margin: auto;
    width: 100%;
    padding-left: 15%;
}
.content {
    width: 100%;
    height: 100%;
}
.card {
    border-radius: 7px;
    width: 80%;
    height: 20%;
}
.body {
    background-color: #c0c0c0;
    height: 100vh;
}
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
    props: {
        name : String, initialDate: String, location: String
    }
})

export default class HomeApp extends Vue {
}
</script>
