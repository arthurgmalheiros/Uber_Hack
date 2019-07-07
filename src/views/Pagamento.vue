<template>
    <div class="div-start view-login" style="justify-content:space-between; position: relative; min-height: 100vh; background-color:#5A5AD4;">
        <div>
            <!-- Logo da organização -->
            <img style="margin-left:auto;margin-right:auto;display:block;padding:60px 0 10px 0;max-width:250px;" src="../assets/logo.png" />
           <span style="text-align:center;color:white;font-size:17pt;">Sempre à frente</span> 
            
            <!-- Formulário -->
            <form style="padding: 0 1.1rem;">
                <DivInput style="margin: 8px 0 !important;" class="wrapper">
                <p class="text_left">Dados de Contato</p><br> 
                    
                    <div class="box_aux">   
                        <label class="text">Assinatura<br>Mensal</label>
                        <label class="number_txt">15,00</label>
                        
                    </div>

                   <input slot="input" class="box" id="NºDOCARTAO" placeholder="Nº do Cartão" label="nºdocartão" v-mask="'9999-9999-9999-9999'":maxlength="18"   v-model="passInput" v-on:focusout="passInputOut" v-show="!showPasswd" required  />

                    <input slot="input" class="box" id="NOMEDOCARTAO" placeholder="Nome do Cartão" label="nomedocartao"  v-model="passInput" v-on:focusout="passInputOut" v-show="!showPasswd" required  />
                     <input slot="input" class="mini_box" id="mm/yyyy" placeholder="MM/YYYY" label="Y/M" v-mask="'99/9999'":maxlength="7"   v-model="passInput" v-on:focusout="passInputOut" v-show="!showPasswd" required  />
                     <input slot="input" class="mini_box" id="cvv" placeholder="CVV" label="CVV" v-mask="'999'":maxlength="18"   v-model="passInput" v-on:focusout="passInputOut" v-show="!showPasswd" required  />

                </DivInput>
             
            </form>
        </div>
        
        <ModalCodigo v-if="modal" @close="modal = false" icon="error_outline" :content="msgModal">
            <div class="display-flex SIM" slot="footer">
                <DefaultButton classDiv="width-45 in_the_middle" name-button="OK" class-component="button-modal" v-on:buttonCallBack="hideModal"/>
            </div>
        </ModalCodigo>
    </div>
</template>

<style>

.box {
	padding: 0 10px!important;
	font-size: 18px!important;
	width: 80%!important;
	max-width: 300px!important;
	height: 60px!important;
	border: 0px!important;
    border-radius: 10px 10px 10px 10px!important;
    background: white!important;
    margin: 10% 0 0 0!important;
}
.box_aux {
	padding: 0 px!important;
	font-size: 18px!important;
	width: 80%!important;
	max-width: 300px!important;
	height: 70px!important;
	border: 0px!important;
    border-radius: 10px 10px 10px 10px!important;
    background: white!important;
    margin: 0 auto!important;
    display:flex;
}

.mini_box{
    padding: 0 10px!important;
	font-size: 18px!important;
	width: 80%!important;
	max-width: 120px!important;
	height: 60px!important;
	border: 0px!important;
    border-radius: 10px 10px 10px 10px!important;
    background: white!important;
    margin: 10% 0 0 5%!important;
}

.submit {
	cursor: pointer!important;
	border: none!important;
	background:orange!important;
	background-size: 35px 35px!important;
	border-radius: 0 10px 10px 0!important;
	display: inline-block!important;
	width: 80px!important;
    height: 60px!important;
    padding: 0px!important;
    color:white;
    font-size: 16px;
    box-shadow: 4px 4px 3px 0px rgba(0,0,0,0.24);   
}

.text_left {
    font-size: 18px!important;
    color: white;
    text-align: left!important;
    padding-top: 5%;
    width: 100%;
   
}
.text {
    font-size: 18px!important;
    color: grey;
    text-align: left!important;
    padding-top: 5%;
    
    
   
}
.number_txt{
    font-size: 36px!important;
    color: blue;
    float: right!important;
    padding-bottom: 50%;
    font-weight: bold;
}
</style>


<script lang="ts">
import Vue from 'vue'
const VueInputMask = require('vue-inputmask').default

Vue.use(VueInputMask)

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import 'bootstrap-vue/dist/bootstrap-vue.css'

export default Vue.extend({
    
    
})
</script>
