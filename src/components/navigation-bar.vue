<template>
  <v-navigation-drawer color="#FF9943" width="260" location="left" permanent>
    <div class="nav">
      <v-btn
        id="OorC"
        class="middlebtn"
        :class="{ 'aberto': aberto, 'fechado': !aberto }"
        @click="toggleStatus"
      >
        {{ aberto ? 'Aberto' : 'Fechado' }}
      </v-btn>
      <v-btn
        id="btn-gest"
        class="middlebtn"
        @click="this.$router.push({ name: 'home' })"
      >
        Gestor
      </v-btn>
      <v-btn
        class="middlebtn"
        @click="this.$router.push({ name: 'analysis' })"
      >
        Análise
      </v-btn>
      <v-btn
        id="log"
        @click="logout"
      >
        Logout
      </v-btn>
    </div>
  </v-navigation-drawer>
 </template>
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';
 import { useRouter } from 'vue-router';
 const aberto = ref(false);
 const router = useRouter();
 function toggleStatus() {
   aberto.value = !aberto.value;
 }
 function logout() {
   localStorage.removeItem('token');
   router.push({ name: 'login' });
 }
 onMounted(() => {
   if (!localStorage.getItem('token')) {
     router.push({ name: 'login' });
   }
 });
 </script>
 <style scoped>
 .aberto {
  background-color: green;
  color: white;
 }
 .fechado {
  background-color: red;
  color: white;
 }
 .nav {
  display: flex;
  flex-direction: column;
  align-items: center;
 }
 #OorC {
  margin-top: 60px;
  margin-bottom: 70px;
 }
 #btn-gest {
  margin-bottom: 40px;
 }
 #log {
  position: absolute;   
  bottom: 20px;
 }
 .middlebtn {
  width: 153px;
 }
 </style>
 