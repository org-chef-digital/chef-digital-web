
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
import { api } from '../services/api';

interface LoginData {
  visibility: string;
  rules: {
    required: (value: string) => boolean | string;
  };
  email: string;
  password: string;
}

export default defineComponent({
  data(): LoginData {
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
    async login(): Promise<void> {
      try {
        const response = await api.post('/auth/signin', {
          email: this.email,
          password: this.password,
        });
        const token = response.data.data.access_token;
        const id = response.data.data.id;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('id', id);
          this.$router.push({ name: 'home' });
        } else {
          console.error('Token JWT undefined.');
        }
      } catch (error) {
        console.error('Error login:', error);
      }
    },
    switchVisibility(): void {
      if (this.visibility === 'password') {
        this.visibility = 'text';
      } else {
        this.visibility = 'password';
      }
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