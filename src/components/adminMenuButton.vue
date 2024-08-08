<template>
    <div>
      <v-menu :close-on-content-click="false" >
        <template v-slot:activator="{ props }" >
          <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
        </template>
        <v-card>
          <v-list>
            <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" title="CR_RFEICOES"></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list>
            <v-list-item>
              <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-btn block class="menu-buttons" v-bind="props">
                    <v-icon class="mr-4">mdi-chevron-down</v-icon>
                    <span>Status</span>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-switch hide-details @click="toggleStatus"> Abrir/Fechar</v-switch>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item>
            <v-list-item>
              <v-btn block class="menu-buttons" @click="createCategory">
                <v-icon class="mr-4">mdi-card-plus-outline</v-icon>
                <span>Criar Categoria</span>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block class="menu-buttons">
                <v-icon class="mr-4">mdi-cog-outline</v-icon>
                <span>Configurações</span>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block class="menu-buttons" @click="logout">
                <v-icon class="mr-4">mdi-logout</v-icon>
                <span>Sair</span>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block class="menu-buttons" @click="copyClientPageLink">
                <v-icon class="mr-4" color="primary">mdi-link</v-icon>
                <span class="link-button">Copiar link</span>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </template>
  
  <script>
  import router from '../router';
  import { ref, onMounted } from 'vue';
  export default {
    name: 'adminMenuButton',
    methods: {
      createCategory() {
        this.$emit('create-category-1');
      },
    
      //copiar o link para o clinte
      copyClientPageLink() {
      const id = localStorage.getItem('id');
      if (id) {
        const clientPageLink = `${window.location.origin}/client/${id}`;
        navigator.clipboard.writeText(clientPageLink);
        console.log('Link copied:', clientPageLink);
      } else {
        console.error('Restaurant ID not found.');
      }
     },

     //deslogar
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      router.push({ name: 'login' });
    },
  }
}
  </script>
  
  <style scoped>

  .menu-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .link-button {
    color: #1976D2;
    border-bottom: 1px solid ;
    padding-bottom: 2px; 
  }
  </style>
  