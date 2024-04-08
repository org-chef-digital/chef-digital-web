<template>
  <v-app>
    <v-main>
      <v-form 
        class="loggin-container">
        
        <v-responsive
        class="mx-auto"
        max-width="344">
        
        <h1>Login</h1>

        <v-text-field 
          hint="Insira seu email de acesso"
          label="Email" 
          placeholder="johndoe@example.com" 
          type="email" 
          variant="outlined">
       </v-text-field>

       <v-text-field
          hint="Insira sua senha para acessar"
          label="Senha"
          type="input"
          variant="outlined">
        </v-text-field>

        <v-btn
          class="btn-entrar"
          color="green"
          width="344">
          Entrar
        </v-btn>

        <h3>Não possui cadastro?</h3>

        <v-btn
          class="btn-cadst"
          color="orange"
          width="172">
          Cadastre-se
        </v-btn>
        </v-responsive>
      </v-form>
    </v-main>
  </v-app>
</template>

<script setup>

</script>

<style scoped>

</style>
