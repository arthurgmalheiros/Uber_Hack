<template>
  <div class="row optionRow">
    <li class="three-options collection-item" v-on:click="click ? click(idIcon) : () => {}">
      <!-- <div class="col s3 optionCol">
        <div :id="idIcon" class="thumbnail">
          <img v-if="icon == ''" :src="img" alt="Imagem">
            <i v-else class="fa fa-restroom"></i>
        </div>
      </div> -->
      <div :id="idIcon"  class="col s12 middleInfo item-middle">
        <span class="name">{{name}}</span>
        <span class="descInfo">{{desc}}</span>
        <div class="row optionRow">
          <span class="smaller">{{date}}</span>
          <span v-bind:class="{
              'status': true,
              'inscrito': status === 'INSCRITO',
              'confirmado': status === 'CONFIRMADO'
            }">{{status}}</span>
        </div>
      </div>
    </li>
  </div>
</template>

<style>
.optionRow{
  margin: 1px !important;
}

.thumbnail {
  margin: 10px 10px 10px 0px !important;
  position: relative;
  width: 100%;
  height: 80px;
}

.thumbnail img {
  border-radius: 8px;
  position: absolute;
  left: 45%;
  top: 50%;
  height: auto;
  width: 100%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.thumbnail img.portrait {
  width: 100%;
  height: auto;
}

.middleInfo {
  text-align: left !important;
  line-height: 150%;
  margin: 5px 0px 5px 0px;
}

.descInfo {
  font-size: 0.9em;
  color: black;
}

.name {
  font-size: 110%;
  color: var(--primary-color);
 }

.info-adicional {
  font-size: 75%;
}

.smaller {
  font-size: 90%;
  font-weight: 300;
}

.status {
  font-size: 70%;
  font-weight: 300;
  float: right;
  color: orange;
}

.inscrito, .confirmado {  
    color: green!important;
}

@media (max-width: 350px){
  .middleInfo {
    font-size: 90% !important;
  }
  
  .desc {
    font-size: 90%;
  }

  .optionCol {
    width: 30%;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  props: {name: String, desc: String, date: String, image: String, click: Function, idIcon: String, status: String}
})

export default class OptionListImageInfos extends Vue {
    
}
</script>

