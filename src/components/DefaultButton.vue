<template>
    <div :class="classDiv" :id="idComponent">
        <!-- SIDENAV TRIGGER -->
        <button v-if="target" :data-target="target" :id="idButton" :class="'sidenav-trigger '+classComponent" v-on:click="buttonClickEvent()">{{nameButton}}
            <i v-if="iconClass" :class="'material-icons '+ iconClass">{{icon}}</i>
        </button>
        <!-- NORMAL BUTTON -->
        <button style="position: relative;" v-else :id="idButton" :class="classComponent" v-on:click="buttonClickEvent()">{{nameButton}}
            <i :class="'material-icons '+ iconClass">{{icon}}</i>
            <i v-if="notificationOn == 'true'" :class="'material-icons '+ notificationIconClass">{{notificationIcon}}</i>
        </button>
    </div>
</template>

<script lang="ts" >
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  props: {
    nameButton: String,  classComponent: String, icon: String, notificationIcon: String, classDiv: String, idComponent: String, iconClass :String, notificationIconClass : String, idButton: String, target: String, notificationOn: String
  }
})

export default class DefaultButton extends Vue {

    buttonClickEvent() {
        this.$emit('buttonCallBack');
    }
}
</script>