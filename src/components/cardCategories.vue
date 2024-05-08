<!-- CardCategories.vue -->

<template>
    <v-container>
      <v-row>
        <v-col v-for="category in categories" :key="category._id">
          <v-card>
            <v-card-title>{{ category.name }}</v-card-title>
            <v-btn @click="openEditModal(category)">Editar</v-btn>
            <v-btn @click="openConfirmationModal(category._id)">Excluir</v-btn>
          </v-card>
          <v-card class="produtos">
            <!-- Conteúdo dos produtos relacionados à categoria -->
          </v-card>
        </v-col>
      </v-row>
      
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    categories: {
      type: Array as PropType<{ _id: string; name: string }[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const openConfirmationModal = (categoryId: string) => {
      emit('open-confirmation-modal', categoryId); // Emitir evento para abrir o modal de confirmação
    };

    const openEditModal = (category: { _id: string; name: string }) => {
      emit('open-edit-modal', category); // Emitir evento para abrir o modal de edição
    };

    return {
      openConfirmationModal,
      openEditModal,
    };
  },
});

  </script>
  
  <style scoped>
  .produtos {
    width: 800px;
    background-color: cornflowerblue;
    border: 1px solid black;
  }
  </style>
  