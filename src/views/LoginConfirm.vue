<template>
    <div class="div-start view-login" style="justify-content:space-between; position: relative; min-height: 100vh; background-color:#5A5AD4;">
        <div>
            <!-- Logo da organização -->
            <img style="margin-left:auto;margin-right:auto;display:block;padding:60px 0 10px 0;" src="../assets/logo.png" />
            <span style="text-align:center;color:white;font-size:17pt;">Sempre a frente</span>
            <!-- Formulário -->
            <form style="padding: 0 1.1rem;">
                <DivInput style="margin: 8px 0 !important;">
                    <input slot="input" class="search" id="CODE" placeholder="_ _ _ _ _ _" v-mask="'9 9 9 9 9 9'" :maxlength="12" v-model="codeConfirm" required  />
                    <input class="submit" type="submit" value="Continuar"/>
                </DivInput>
                <label class="cadastro">Informe o código que enviamos para o seu telefone.</label>
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

.search {
	padding: 0 30px!important;
	font-size: 18px!important;
	width: 40%!important;
	max-width: 300px!important;
	height: 60px!important;
	border: 0px!important;
    border-radius: 10px 0 0 10px!important;
    background: white!important;
    margin: 40% 0 0 0!important;
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

.cadastro {
    width: 80%;
    font-size: 17px!important;
    color: white;
    text-align: center;
    padding-top: 5%;
    display: inline-block!important;
}
</style>


<script lang="ts">
import Vue from 'vue'
const VueInputMask = require('vue-inputmask').default

Vue.use(VueInputMask)

export default Vue.extend({
    
})
</script>
