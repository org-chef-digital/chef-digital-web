<template>
  <v-dialog>
    <v-card>
      <v-card-title>Category name</v-card-title>
      <v-card-text>
        <v-text-field v-model="categoryName"></v-text-field>
        <v-btn @click="saveCategory">Save</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
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
