<template>
  <div id="app">
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
