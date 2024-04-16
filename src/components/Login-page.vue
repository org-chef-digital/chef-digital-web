<script>
import axios from 'axios';
export default{
  data() {
    return {
      show1: false,
      rules: {
        required: value => !!value || 'Campo obrigatório.',
      },
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/auth/signin', {
          email: this.email,
          password: this.password,
        });
        console.log('Login efetuado com sucesso:', response.data);
        router.push({ name: 'home' });
      } catch (error) {
        console.error('Erro durante o login:', error);
      }
    },
    goTregister() {
      this.$router.push({ name: 'register' });
    }
  }
}
</script>

<template>
  <v-responsive
  aspect-ratio="16/9">
  
 <v-container
  class="pagel">
  

    <v-navigation-drawer
    color="#FF9943"
    width="385"
    location="right"
    permanent
    >
    <v-form
 class="loggin">
            
            <v-app-bar-title class="tl text-lg-center">Login</v-app-bar-title>

            <v-text-field 
              v-model="email"
              bg-color="white"
              hint="Insira seu nome fantasia de acesso"
              label="Email" 
              placeholder="john123@example.com" 
              type="email"
              :rules="[rules.required]" 
              variant="outlined">
          </v-text-field>

          <v-text-field
              v-model="password"
              bg-color="white"
              hint="Insira sua senha para acessar"
              label="Senha"
              type="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show1 ? 'text':'password'"
              variant="outlined">
          </v-text-field>

            <v-btn
              class="btn-entrar"
              color="green"
              width="344"
              @click="login">
              Entrar
            </v-btn>
          
            <p class="tnpc text-lg-center">Não possui cadastro?</p>

            <v-btn
              class="btn-cadst"
              color="blue"
              width="150"
              @click="goTregister"
              >
              Cadastre-se
            </v-btn>
        
          </v-form>
          
        </v-navigation-drawer>
      </v-container>
    </v-responsive>
</template>


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
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .v-text-field{
    margin: 0.2%;
    width: 90%;
  }
  .loggin{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
