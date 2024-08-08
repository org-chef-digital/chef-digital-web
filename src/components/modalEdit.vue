<template>
  <v-dialog v-model="showModal" persistent max-width="600px">
    <v-card>
      <v-card-title>Edit category</v-card-title>
      <v-card-text>
        <v-text-field v-model="category.name" label="Nome da categoria"></v-text-field>
        <v-btn @click="confirmEdit">Save</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    category: {
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    confirmEdit() {
      this.$emit('confirm-edit', this.category);
      this.showModal = false;
    },
    cancel() {
      this.$emit('update:modelValue', false);
      this.showModal = false;
    },
  },
});
</script>
