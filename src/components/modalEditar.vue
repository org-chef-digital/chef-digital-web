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
import axios from 'axios';

export default defineComponent({
  props: {
    category: {
      type: Object as PropType<{ _id: string; name: string }>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'confirm-edit'], // Adicionar evento confirm-edit
  setup(props, { emit }) {
    const showModal = ref(false);
    const editedCategory = ref({ ...props.category });

    const confirmEdit = async () => {
      try {
        await axios.put(`/categories/${editedCategory.value}`, { name: editedCategory.value.name });
        emit('confirm-edit', editedCategory.value); // Emitir evento para confirmar a edição, passando a categoria editada
        showModal.value = false;
      } catch (error) {
        console.error('Erro ao editar categoria:', error);
      }
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
