<template>
    <v-dialog persistent max-width="600px">
      <v-card>
        <v-card-title>Delete product</v-card-title>
        <v-card-text>
          <p>Do you really want to delete product?</p>
          <v-btn @click="confirmDeleteProduct">Delete</v-btn>
          <v-btn @click="cancel">Cancel</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">  
  import { defineComponent, PropType, ref } from 'vue';
  
  export default defineComponent({
    props: {
      productId: String,
    },
    emits: ['update:modelValue', 'confirm-delete-product'],
    methods: {
      confirmDeleteProduct() {
        this.$emit('confirm-delete-product', this.productId); 
        this.$emit('update:modelValue', false);
      },
      cancel() {
        this.$emit('update:modelValue', false);
      },
    },
  });
  </script>
  