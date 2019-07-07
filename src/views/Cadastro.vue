<template>
    <div class="div-start view-login" style="justify-content:space-between; position: relative; min-height: 100vh; background:#5A5AD4 repeat;">
        <div>
            <!-- Logo da organização -->
            <img style="margin-left:auto;margin-right:auto;display:block;padding:60px 0 10px 0;max-width:250px;" src="../assets/logo.png" />
           <span style="text-align:center;color:white;font-size:17pt;">Sempre à frente</span> 
            
            <!-- Formulário -->
            <form style="padding: 0 1.1rem;">
                <div style="margin: 8px 0 !important;" class="wrapper">                    
                    <input slot="input" class="box" id="NOME" placeholder="Nome Completo" label="nome" v-model="name" required  />

                    <input slot="input" class="box" id="CPF" placeholder="CPF" label="cpf" v-mask="'999.999.999-99'" :maxlength="14" v-model="cpf" required  />

                    <input slot="input" class="box" id="PASSWORD" placeholder="Telefone" label="Telefone" v-mask="'(99) 99999-9999'" :maxlength="15" v-model="phoneNumber" required />
                </div>
                <div style="margin-top: 50px;">
                    <a class="button" @click="$router.push('HomeApp')">Cadastrar</a>
                </div>
            </form>
        </div>
    </div>
</template>

<style>

.button {
    width: 100%;
    padding: 10px 50px;
    height: 100%;
    border-radius: 10px;
    background-color: orange;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: white;
}

.input {
	font-size: 18px!important;
	width: 80%!important;
	max-width: 300px!important;
	height: 60px!important;
	border: 0px!important;
    border-radius: 10px 10px 10px 10px!important;
    background: white!important;
    margin-top: 0!important;
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

.text {
    font-size: 18px!important;
    color: white;
    text-align:center!important;
    padding-top: 5%;
    width: 100%;
    
   
}
</style>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ 
})

export default class Cadastro extends Vue {
    name: string = '';
    cpf: string = '';
    phoneNumber: string = '';
}
</script>
