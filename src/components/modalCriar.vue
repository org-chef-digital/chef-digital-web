<template>
    <v-dialog v-model="value">
      <v-card>
        <v-card-title>Nome da categoria</v-card-title>
        <v-card-text>
          <v-text-field v-model="categoryName"></v-text-field>
          <v-btn @click="saveCategory">Salvar</v-btn>
          <v-btn @click="cancel">Cancelar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    props: {
      value: Boolean as PropType<boolean>,
    },
    emits: ['update:modelValue'],
    data() {
      return {
        categoryName: '',
      };
    },
    methods: {
      async saveCategory() {
        try {
          const response = await axios.post('/categories', {
            name: this.categoryName,
          });
          console.log(response.data); // Aqui você pode lidar com a resposta da API
          this.categoryName = ''; // Limpa o campo de texto após salvar
          this.$emit('update:modelValue', false); // Fecha o modal após salvar
        } catch (error) {
          console.error('Erro ao criar categoria:', error);
        }
      },
      cancel() {
        this.$emit('update:modelValue', false); // Fecha o modal ao cancelar
      },
    },
  });
  </script>
  