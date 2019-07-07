<template>
  <div id="app">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <router-view />
    <LoadingPhases />
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator';

  declare var M: any;
  declare var $: any;

  export default class App extends Vue {
    
    userIsLogged() {
      const _window:any = window;
      return localStorage.getItem('USER_ID');
    }

  }
</script>

<style>
</style>
