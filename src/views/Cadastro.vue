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
                    
                    <input slot="input" class="box" id="NOME" placeholder="Nome Completo" label="nome"   v-model="passInput" v-on:focusout="passInputOut" v-show="!showPasswd" required  />

                   <input slot="input" class="box" id="CPF" placeholder="CPF" label="cpf" v-mask="'999-999-999-99'":maxlength="13"   v-model="passInput" v-on:focusout="passInputOut" v-show="!showPasswd" required  />

                    <input slot="input" class="box" id="PASSWORD" placeholder="Telefone" label="Telefone" v-mask="'(99) 99999-9999'" :maxlength="15" v-model="passInput" v-on:focusout="passInputOut" v-show="!showPasswd" required  />

                    <p class="text">Você dirige para quais aplicativos?</p><br>
                    <div>
                    <b-form-checkbox  id="99" >
                    99
                    </b-form-checkbox>
                    </div>
                     <div>
                    <b-form-checkbox  id="Uber" >
                    Uber
                    </b-form-checkbox>
                    </div>
                     <div>
                    <b-form-checkbox  id="Cabify" >
                    Cabify
                    </b-form-checkbox>
                    </div>
                     <div>
                    <b-form-checkbox  id="Taxi" >
                    Taxi
                    </b-form-checkbox>
                    </div>
                    <div>
                    <input type="checkbox" v-model="checked">
                    <input slot="input" id="OUTROS" placeholder="Outros" label="outros"   v-model="passInput" v-on:focusout="passInputOut" v-show="!showPasswd" required  >
                    </div>
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
    margin: 10% 19% 0 0!important;
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
    color: white;
    text-align:center!important;
    padding-top: 5%;
    width: 100%;
    
   
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
