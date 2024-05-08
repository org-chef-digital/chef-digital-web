<template>
    <v-dialog>
      <v-card>
        <v-card-title>Excluir categoria</v-card-title>
        <v-card-text>
          <p>Tem certeza que deseja excluir esta categoria?</p>
          <v-btn @click="confirmDelete()">Excluir</v-btn>
          <v-btn @click="cancel()">Cancelar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    value: Boolean as PropType<boolean>,
    categoryId: String as PropType<string>, // Adicione a propriedade categoryId
  },
  emits: ['update:modelValue', 'confirm-delete'], // Adicionar evento confirm-delete
  setup(props, { emit }) {
    const showModal = ref(false);

    const confirmDelete = () => {
      emit('confirm-delete', props.categoryId); // Emitir evento para confirmar a exclusão, passando o categoryId
      showModal.value = false;
    };

    const cancel = () => {
      emit('update:modelValue', false);
    };

    return {
      showModal,
      confirmDelete,
      cancel,
    };
  },
});

  </script>
  