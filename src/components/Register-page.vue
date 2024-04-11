<template>
  <v-responsive aspect-ratio="16/9">
    <v-container class="page">
      <v-navigation-drawer v-model="drawer" app permanent width="400" color="amber-darken-4">
        <v-app-bar-title>Cadastre-se</v-app-bar-title>
        <v-form class="form">
          <v-text-field label="Nome Fantasia" variant="outlined" bg-color="white" required></v-text-field>

          <v-text-field label="Telefone (+DDD)" variant="outlined" bg-color="white" required></v-text-field>

          <v-text-field label="Email" variant="outlined" bg-color="white" required></v-text-field>

          <v-text-field v-model="password" label="Crie sua senha" type="password" variant="outlined"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min8chars, rules.uppercase, rules.lowercase]"
            :type="show1 ? 'text' : 'password'" bg-color="white" required></v-text-field>

          <v-text-field v-model="confirmPassword" label="Confirme sua senha" type="password" variant="outlined"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.matchPassword]"
            :type="show1 ? 'text' : 'password'" bg-color="white" required></v-text-field>

          <v-btn class="conclusion" color="green">Concluir</v-btn>
        </v-form>
        <div class="login">
          <h4>Já tem uma conta?</h4>
          <v-btn class="returnLogin" color="primary">Faça login</v-btn>
        </div>
      </v-navigation-drawer>
    </v-container>
  </v-responsive>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      drawer: true,
      show1: false,
      rules: {
        required: value => !!value || 'Campo obrigatório',
        min8chars: value => value.length >= 8 || 'Mínimo de 8 caracteres',
        uppercase: value => /[A-Z]/.test(value) || 'Pelo menos uma letra maiúscula',
        lowercase: value => /[a-z]/.test(value) || 'Pelo menos uma letra minúscula',
        matchPassword: (value) => value === this.password || 'As senhas não coincidem.',
      },
    };
  },
  methods: {

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
  margin-top: 5%;
  text-align: center;
}

.v-text-field {
  margin: 0.2%;
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
