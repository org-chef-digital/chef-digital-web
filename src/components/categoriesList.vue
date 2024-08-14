<template>
    <v-container>
      <v-row>
        <v-col v-for="category in categories" :key="category._id">
          <v-card>
            <v-card-title>{{ category.name }}</v-card-title>
          </v-card>
          <v-card class="categories">
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    categories: { _id: string; name: string }[];
  }>();
  </script>
  
  <style scoped>
  .categories {
    width: 800px;
    background-color: cornflowerblue;
    border: 1px solid black;
  }
  </style>
  