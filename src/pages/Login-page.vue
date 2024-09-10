<template>
  <v-responsive aspect-ratio="16/9">
    <v-container class="pagel">
      <v-navigation-drawer color="#FF9943" width="385" location="right" permanent>
        <v-form class="loggin">
          <v-app-bar-title class="tl text-lg-center">Login</v-app-bar-title>

          <v-text-field
            v-model="email"
            bg-color="white"
            hint="Enter your email"
            label="Email"
            placeholder="john123@example.com"
            type="email"
            :rules="[rules.required]"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="password"
            bg-color="white"
            hint="Enter your password"
            label="Password"
            :type="visibility"
            :append-icon="visibility === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            @click:append="switchVisibility"
            variant="outlined"
          ></v-text-field>
          
          <v-btn class="btn-entrar" color="green" width="344" @click="login">Login</v-btn>

          <p class="tnpc text-lg-center">Don't have a registration?</p>

          <v-btn class="btn-cadst" color="blue" width="150" @click="this.$router.push({ name: 'register' })">Register</v-btn>
        </v-form>
      </v-navigation-drawer>
    </v-container>
  </v-responsive>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { restaurantServices } from '../services/restaurantServices';

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      visibility: 'password',
      rules: {
        required: (value: string) => !!value || 'Required.',
      },
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const restaurantSignIn = {
          email: this.email,
          password: this.password,
        };
        const response = await restaurantServices.signIn(restaurantSignIn);
        if (response.success) {
          localStorage.setItem('token', response.data.access_token); 
          localStorage.setItem('id', response.data.id);              
          this.$router.push({ path: '/home' });
          console.log("Login efetuado com sucesso");
        } else {
          console.error('Erro de Login:', response.message);
        }
      } catch (error) {
        console.error('Error login:', error);
      }
    },
    switchVisibility() {
      this.visibility = this.visibility === 'password' ? 'text' : 'password';
    }
  }
});
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