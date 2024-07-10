<template>
    <v-form>
      <v-text-field 
      v-model="formData.fantasyName" 
      label="Fantasy name" 
      placeholder="Mr.example burger" 
      variant="outlined" 
      bg-color="white" 
      :rules="rules.fantasyName"
      ></v-text-field>
  
      <v-text-field 
      v-model="formData.phone" 
      label="DDD + Telephone" 
      placeholder="11900000000" 
      variant="outlined" 
      bg-color="white" 
      :rules="rules.phone"
      ></v-text-field>
  
      <v-text-field 
      v-model="formData.email" 
      label="Email" 
      placeholder="john123@example.com" 
      variant="outlined" 
      bg-color="white" 
      :rules="rules.email"
      ></v-text-field>
  
      <v-text-field 
      v-model="formData.password" 
      label="Create your password" 
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
      label="Confirm your password" 
      variant="outlined" 
      bg-color="white" 
      :rules="rules.confirmPassword" 
      :type="visibility"
      >
        <v-icon @click="switchVisibility">
            {{ visibility === 'password' ? 'mdi-eye' : 'mdi-eye-off' }}
        </v-icon>
    </v-text-field>
  
      <v-btn class="conclusion" color="green" @click="register">Finish</v-btn>
    </v-form>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import {api}  from '../services/api';
  
  interface FormData {
    fantasyName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export default defineComponent({
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
          fantasyName: [(v: string) => !!v || 'Required'],
          phone: [
            (v: string) => !!v || 'Required',
            (v: string) => /^\d{11}$/.test(v) || 'Invalid phone',
          ],
          email: [
            (v: string) => !!v || 'Required',
            (v: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v) || 'Invalid email',
          ],
          password: [
            (v: string) => !!v || 'Required',
            (v: string) => v.length >= 8 || 'Minimum 8 characters',
            (v: string) => /[A-Z]/.test(v) || 'At least one capital letter',
            (v: string) => /[a-z]/.test(v) || 'At least one capital letter',
          ],
          confirmPassword: [
            (v: string) => !!v || 'Required',
            (v: string) => this.matchPassword(v) || 'Passwords do not match.',
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
          const response = await api.post('restaurant/register', this.formData);
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
  