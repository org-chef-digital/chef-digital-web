<template>
    <v-form>
      <v-text-field 
      v-model="formData.fantasyName" 
      label="Nome Fantasia" 
      placeholder="Empresa XPTO" 
      variant="outlined" 
      bg-color="white" 
      :rules="rules.fantasyName"
      ></v-text-field>
  
      <v-text-field 
      v-model="formData.phone" 
      label="Telefone (+DDD)" 
      placeholder="11 99999-9999" 
      variant="outlined" 
      bg-color="white" 
      :rules="rules.phone"
      ></v-text-field>
  
      <v-text-field 
      v-model="formData.email" 
      label="Email" 
      placeholder="meuemail@email.com" 
      variant="outlined" 
      bg-color="white" 
      :rules="rules.email"
      ></v-text-field>
  
      <v-text-field 
      v-model="formData.password" 
      label="Crie sua senha" 
      variant="outlined" 
      bg-color="white" 
      :rules="rules.password" 
      :type="visibility" 
      >
        <v-icon @click="switchVisibility">
            {{ visibility === 'password' ? 'mdi-eye' : 'mdi-eye-off' }}
        </v-icon>
    </v-text-field>
  
      <v-text-field 
      v-model="formData.confirmPassword"
      label="Confirme sua senha" 
      variant="outlined" 
      bg-color="white" 
      :rules="rules.confirmPassword" 
      :type="visibility"
      >
        <v-icon @click="switchVisibility">
            {{ visibility === 'password' ? 'mdi-eye' : 'mdi-eye-off' }}
        </v-icon>
    </v-text-field>
  
      <v-btn class="conclusion" color="green" @click="register">Concluir</v-btn>
    </v-form>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  interface FormData {
    fantasyName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export default defineComponent({
    name: 'RegisterForm',
    data() {
      return {
        visibility: 'password',
        formData: {
          fantasyName: '',
          phone: '',
          email: '',
          password: '',
        } as FormData,
        rules: {
          fantasyName: [(v: string) => !!v || 'Campo obrigatório'],
          phone: [
            (v: string) => !!v || 'Campo obrigatório',
            (v: string) => /^\d{2}\s\d{5}-\d{4}$/.test(v) || 'Telefone inválido',
          ],
          email: [
            (v: string) => !!v || 'Campo obrigatório',
            (v: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v) || 'Email inválido',
          ],
          password: [
            (v: string) => !!v || 'Campo obrigatório',
            (v: string) => v.length >= 8 || 'Mínimo de 8 caracteres',
            (v: string) => /[A-Z]/.test(v) || 'Pelo menos uma letra maiúscula',
            (v: string) => /[a-z]/.test(v) || 'Pelo menos uma letra minúscula',
          ],
          confirmPassword: [
            (v: string) => !!v || 'Campo obrigatório',
            (v: string) => this.matchPassword(v) || 'As senhas não coincidem.',
          ],
        },
      };
    },
    methods: {
        switchVisibility() {
      if (this.visibility === 'password') {
        this.visibility = 'text';
      } else {
        this.visibility = 'password';
      }
    },
      async register() {
        try {
          const response = await axios.post('restaurant/register', this.formData);
          this.$router.push({ name: 'login' });
        } catch (error) {
          console.error(error);
        }
      },
        matchPassword(v: string) {
            return v === this.formData.password;
        },
    },
  });
  </script>
  <style scoped>
  .v-text-field {
    margin: 1%;
    width: 60%;
  }
  
  .v-form {
    margin-top: 8%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .v-icon{
    position: absolute;
    right: 8%;
  }
</style>
  