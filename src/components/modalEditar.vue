<template>
    <v-dialog v-model="showModal">
      <v-card>
        <v-card-title>Editar categoria</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedCategory.name" label="Nome da categoria"> </v-text-field>
          <v-btn @click="confirmEdit()">Salvar</v-btn>
          <v-btn @click="cancel()">Cancelar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';
  
  export default defineComponent({
    props: {
      category: {
        type: Object as PropType<{ _id: string; name: string }>,
        required: true,
      },
    },
    data(){
        return{
            editedCategory: { ...this.category }
        }
    },
    emits: ['update:modelValue', 'confirm-edit'], // Adicionar evento confirm-edit
    setup(props, { emit }) {
      const showModal = ref(false);
      const editedCategory = ref({ ...props.category }); // Estado para armazenar a categoria editada
  
      const confirmEdit = () => {
        emit('confirm-edit', { editedCategory }); // Emitir evento para confirmar a edição, passando a categoria editada
        showModal.value = false;
      };
  
      const cancel = () => {
        emit('update:modelValue', false);
      };
  
      return {
        showModal,
        editedCategory,
        confirmEdit,
        cancel,
      };
    },
  });
  </script>
  