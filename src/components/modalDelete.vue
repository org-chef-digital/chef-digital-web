<template>
  <v-dialog>
    <v-card>
      <v-card-title>Delete category</v-card-title>
      <v-card-text>
        <p>Do you really want to delete category?</p>
        <v-btn @click="confirmDelete">Delete</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
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
