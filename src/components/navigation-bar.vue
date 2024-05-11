<template>
  <v-navigation-drawer color="#FF9943" width="260" location="left" permanent>
    <div class="nav">
      <v-btn id="OorC" class="middlebtn" :class="{ 'aberto': aberto, 'fechado': !aberto }" @click="toggleStatus">
        {{ aberto ? 'Aberto' : 'Fechado' }}
      </v-btn>
      <v-btn id="btn-gest" class="middlebtn" @click="this.$router.push({ name: 'home' })">
        Gestor
      </v-btn>
      <v-btn class="middlebtn" @click="this.$router.push({ name: 'analysis' })">
        Análise
      </v-btn>
      <v-btn id="log" @click="logout">
        Logout
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { api } from '../services/api';

const aberto = ref(false);
const router = useRouter();

async function toggleStatus() {
  aberto.value = !aberto.value;
  await updateStatus(aberto.value);
}

async function getStatus() {
  const token = localStorage.getItem('token');
  if (!token) return;
  const id = localStorage.getItem('id');
  if (!id) return;

  try {
    const response = await api.get(`/restaurant/${id}/status`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    aberto.value = response.data.data;
  } catch (error) {
    console.error('Erro ao obter status da loja:', error);
  }
}

async function updateStatus(status) {
  const token = localStorage.getItem('token');
  if (!token) return;
  const id = localStorage.getItem('id');
  if (!id) return;

  try {
    const response = await api.put(`/restaurant/${id}/updateStatus`, {
      status
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('Status atualizado:', response.data.data);
  } catch (error) {
    console.error('Erro ao atualizar status da loja:', error);
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  router.push({ name: 'login' });
}

onMounted(() => {
  if (!localStorage.getItem('token')) {
    router.push({ name: 'login' });
  } else {
    getStatus();
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