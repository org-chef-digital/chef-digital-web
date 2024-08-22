<template>
  <v-responsive aspect-ratio="9/16">
    <div class="barraNav">
      <img src="../lib/logo.png" alt="logo" class="logomarca">
      <CartButton />
    </div>
    <v-container>
      <template v-if="restaurantOpen">
        <h2>Menu do dia {{ new Date().toLocaleDateString() }} | {{ new Date().toLocaleTimeString() }}</h2>
        
        <v-list>
          <h2>Selecione o tipo de marmita:</h2>
          
          <br>
          <v-btn @click="selectSize('P')"><strong>P</strong> | R${{ prices.P | currency }}</v-btn>
          <v-btn @click="selectSize('M')"><strong>M</strong> | R${{ prices.M | currency }}</v-btn>
          <v-btn @click="selectSize('G')"><strong>G</strong> | R${{ prices.G | currency }}</v-btn>
          <List :categories="categories" :products="products" :selectedSize="selectedSize" />
          <br>
        </v-list>

      </template>
      <template v-else>
        <p>O restaurante está fechado no momento. Por favor, volte mais tarde.</p>
      </template>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import List from '../components/categoriesList.vue';

import { Category } from '@/services/categoryServices/categoryTypes';

import { api } from '../services/api';
import CartButton from '@/components/cartButton.vue';

const categories = ref<Category[]>([]);
const products = ref<{ _id: string; title: string; price: number; category_id: string }[]>([]);

const restaurantOpen = ref<boolean>(true);
const route = useRoute();

const prices = {
  P: 10.0, 
  M: 15.0, 
  G: 20.0, 
};

const selectedSize = ref<string>('P');
const selectedPrice = ref<number>(prices[selectedSize.value]);

function selectSize(size: 'P' | 'M' | 'G') {
  selectedSize.value = size;
  selectedPrice.value = prices[size];
}

async function fetchCategories() {
  try {
    const restaurantId = route.params.id;
    const response = await api.get(`/categories/restaurant/${restaurantId}`);
    categories.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }
}

async function fetchProducts() {
  try {
    const response = await api.get(`/products/all`);
    products.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
}

async function checkRestaurantStatus() {
  try {
    const restaurantId = route.params.id;
    const response = await api.get(`/restaurant/${restaurantId}/status`);
    restaurantOpen.value = response.data.data;
  } catch (error) {
    console.error('Erro ao verificar o status do restaurante:', error);
  }
}

onMounted(async () => {
  await fetchCategories();
  await fetchProducts();
  await checkRestaurantStatus();

  if (!restaurantOpen.value) {
    categories.value = [];
  }
});
</script>

<style scoped>
.barraNav {
  background-color: #DE6A16;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;
}
</style>
