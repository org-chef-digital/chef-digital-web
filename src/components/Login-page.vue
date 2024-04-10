<template>
  <v-container
    class="pagel">

    <v-navigation-drawer
    color="#FF9943"
    width="370"
    location="right"
    permanent
    >
    <v-form
 class="loggin">

          <v-responsive
            class="mx-auto"
            max-width="344">
            
            <h1 class="tl text-lg-center">Login</h1>

            <v-text-field 
              bg-color="white"
              hint="Insira seu email de acesso"
              label="Email" 
              placeholder="johndoe@example.com" 
              type="email" 
              variant="outlined">
            </v-text-field>
            
            <v-text-field
              bg-color="white"
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
          
            <p class="tnpc text-lg-center">Não possui cadastro?</p>

            <v-btn
              class="btn-cadst"
              color="blue"
              width="150">
              Cadastre-se
            </v-btn>
        
          </v-responsive>
        </v-form>

      </v-navigation-drawer>
    </v-container>
</template>

<script setup>

</script>

<style scoped>
  .pagel {
    background: url('../assets/backgron1.jpg');
    background-size: cover;
    height: 100vh;
  }

  .tl{
    margin-top: 140px;
    margin-bottom: 20px;
  }
  .tnpc{
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .btn-cadst{
    margin-left: 93px;
  }
</style>
