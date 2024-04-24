<template>
  <v-responsive aspect-ratio="16/9">
    <v-container class="page">
      <v-navigation-drawer v-model="drawer" app permanent width="385" color="#FF9943">
        <v-app-bar-title>Cadastre-se</v-app-bar-title>
        <v-form class="form">
          <v-text-field 
          v-model="fantasyName"
          label="Nome Fantasia" 
          placeholder="Empresa XPTO"
          variant="outlined" 
          bg-color="white" 
          ></v-text-field>

          <v-text-field 
          v-model="phone"
          label="Telefone (+DDD)" 
          placeholder="11 99999-9999"
          :rules="[rules.required, rules.phoneFormat]"
          variant="outlined" 
          bg-color="white" 
          ></v-text-field>

          <v-text-field 
          v-model="email"
          placeholder="meuemail@email.com"
          :rules="[rules.required, rules.email]"
          label="Email" 
          variant="outlined" 
          bg-color="white" 
          ></v-text-field>

          <v-text-field 
          v-model="password" 
          label="Crie sua senha" 
          variant="outlined"
          :append-icon="visibility === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min8chars, rules.uppercase, rules.lowercase]"
          :type="visibility" 
          @click:append="switchVisibility"
          bg-color="white" 
          ></v-text-field>

          <v-text-field 
          label="Confirme sua senha" 
          variant="outlined"
          :append-icon="visibility === 'password' ? 'mdi-eye' : 'mdi-eye-off'" 
          :rules="[rules.required, rules.matchPassword]"
          :type="visibility" 
          @click:append="switchVisibility"
          bg-color="white"
          ></v-text-field>

          <v-btn class="conclusion" color="green" @click="register">Concluir</v-btn>
        </v-form>
        <div class="login">
          <h4>Já tem uma conta?</h4>
          <v-btn class="returnLogin" color="primary" @click="backStage">Faça login</v-btn>
        </div>
      </v-navigation-drawer>
    </v-container>
  </v-responsive>
</template>

<script>
import axios from 'axios';

export default {
  name: 'register',
  data() {
    return {
      visibility: 'password',
      fantasyName: '',
      phone: '',
      email: '',
      password: '',
      drawer: true,
      show1: false,
      rules: {
        required: value => !!value || 'Campo obrigatório',
        min8chars: value => value.length >= 8 || 'Mínimo de 8 caracteres',
        uppercase: value => /[A-Z]/.test(value) || 'Pelo menos uma letra maiúscula',
        lowercase: value => /[a-z]/.test(value) || 'Pelo menos uma letra minúscula',
        matchPassword: (value) => value === this.password || 'As senhas não coincidem.',
        email: value => {
          const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          return pattern.test(value) || 'Email inválido';
        },
        phoneFormat: value => {
          const pattern = /^\d{2}\d{5}\d{4}$/;
          return pattern.test(value) || 'Telefone inválido';
        },
      },
    };
  },
  methods:{
    switchVisibility() {
      if (this.visibility === 'password') {
        this.visibility = 'text';
      } else {
        this.visibility = 'password';
      }
    },
    async register() {
      try {
        const response = await axios.post('restaurant/register', {
          fantasyName: this.fantasyName,
          phone: this.phone,
          email: this.email,
          password: this.password
        });
        console.log(response.data);
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error(error);
      }
    },
    backStage() {
      this.$router.push({ name: 'login' });
    },
  }
};
</script>

<style scoped>
.page {
  background: url('../assets/backgron1.jpg');
  background-size: cover;
  height: 100vh;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8%;
}

h4 {
  font-family: 'Roboto', sans-serif;
  color: #000;
  text-align: center;
}

.v-app-bar-title {
  color: #000;
  font-size: 25px;
  font-family: 'Roboto', sans-serif;
  margin-top: 15%;
  text-align: center;
}

.v-text-field {
  margin: 1%;
  width: 60%;
}

.form {
  margin-top: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.conclusion {
  width: 60%;
}

.returnLogin {
  margin-top: 2%;
}
</style>
>>>>>>> S02-tela-de-cadastro
