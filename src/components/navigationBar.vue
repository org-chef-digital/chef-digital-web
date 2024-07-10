<template>
  <v-navigation-drawer color="#FF9943" width="260" location="left" permanent>
    <div class="nav">
      <v-btn id="OorC" class="middlebtn" :class="{ 'Open': open, 'Close': !open }" @click="toggleStatus">
        {{ open ? 'Open' : 'Close' }}
      </v-btn>
      <v-btn id="btn-gest" class="middlebtn" @click="this.$router.push({ name: 'home' })">
        Manager
      </v-btn>
      <v-btn id="btn-gest" class="middlebtn" @click="this.$router.push({ name: 'analysis' })">
        Analysis
      </v-btn>
      <v-btn id="link-btn" class="middlebtn" @click="copyClientPageLink">
        Copy Client Link
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
import { api } from '../services/api';

const open = ref(false);
const router = useRouter();

async function toggleStatus() {
  open.value = !open.value;
  await updateStatus(open.value);
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
    console.error('Error status:', error);
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
    console.error('Error when updating status:', error);
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  router.push({ name: 'login' });
}

function copyClientPageLink() {
  const id = localStorage.getItem('id');
  if (id) {
    const clientPageLink = `${window.location.origin}/client/${id}`; // Link da página do cliente
    navigator.clipboard.writeText(clientPageLink); // Copia o link para a área de transferência
    console.log('Link copied:', clientPageLink);
  } else {
    console.error('Restaurant ID not found.');
  }
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
.Open {
  background-color: green;
  color: white;
}

.Close {
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

#link-btn{
  background-color: rgb(178, 248, 248);
}

.middlebtn {
  width: 153px;
}
</style>
