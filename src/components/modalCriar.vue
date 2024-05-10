<template>
  <v-dialog>
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
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['update:modelValue', 'save-category'],
  data() {
    return {
      categoryName: '',
    };
  },
  methods: {
    saveCategory() {
      this.$emit('save-category', this.categoryName);
      this.categoryName = ''; 
      this.$emit('update:modelValue', false);
    },
    cancel() {
      this.$emit('update:modelValue', false);
    },
  },
});
</script>
