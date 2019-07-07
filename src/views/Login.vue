<template>
    <div class="div-start view-login" style="justify-content:space-between; position: relative; min-height: 100vh; background-color:#5A5AD4;">
        <div>
            <!-- Logo da organização -->
            <img style="margin-left:auto;margin-right:auto;display:block;padding:60px 0 10px 0;" src="../assets/logo.png" />
            <span style="text-align:center;color:white;font-size:17pt;">Sempre à frente</span>
            <!-- Formulário -->
            <form style="padding: 0 1.1rem;">
                <div style="margin: 8px 0 !important;" class="wrapper">
                    <input slot="input" class="search" v-on:keyup="storePN(phoneNumber)" id="PHONENUMBER" placeholder="Telefone" v-mask="'(99) 99999-9999'" :maxlength="15" v-model="phoneNumber" required />
                    <input class="submit" type="submit" @click="$router.push('LoginConfirm')" value="Continuar"/>
                </div>
                <div>
                    <label class="cadastro">Não tem uma conta?</label>
                    <div class="cadastro" style="color:orange" @click="$router.push('Cadastro')"> Cadastre-se</div>
                </div>
            </form>
        </div>
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
    font-size: 18px!important;
    color: white;
    text-align: center;
    padding-top: 20%;
    display: inline-block!important;
}
</style>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ 
})

export default class Login extends Vue {
    phoneNumber: string =  localStorage.getItem('CADASTRO_PN') || '';

    storePN(phoneNumber:any){
        localStorage.setItem('CADASTRO_PN', phoneNumber);
    }

}
</script>
