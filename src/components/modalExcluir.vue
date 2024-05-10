<template>
  <v-dialog>
    <v-card>
      <v-card-title>Excluir categoria</v-card-title>
      <v-card-text>
        <p>Tem certeza que deseja excluir esta categoria?</p>
        <v-btn @click="confirmDelete">Excluir</v-btn>
        <v-btn @click="cancel">Cancelar</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">  
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    categoryId: String,
  },
  emits: ['update:modelValue', 'confirm-delete'],
  methods: {
    confirmDelete() {
      this.$emit('confirm-delete', this.categoryId); 
      this.$emit('update:modelValue', false);
    },
    cancel() {
      this.$emit('update:modelValue', false);
    },
  },
});
</script>
