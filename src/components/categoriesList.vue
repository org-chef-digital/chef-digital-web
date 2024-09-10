<template>
  <v-container>
    <v-row>
      <v-col v-for="category in categories" :key="category._id" cols="12">
        <v-card>
          <v-card-title>
            <v-row align="center" justify="space-between" class="w-100">
              <v-col cols="auto">
                {{ category.name }}
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="product in filteredProducts(category._id)" :key="product._id" cols="12">
                <v-card>
                  <v-card-title>
                    <v-row align="center" justify="space-between" class="w-100">
                      <v-col cols="auto">
                        {{ product.title }}
                      </v-col>
                      <v-col cols="auto">
                        <v-btn @click="decreaseQuantity(product._id)" :disabled="quantities[product._id] <= 0">-</v-btn>
                        <span>{{ quantities[product._id] || 0 }}</span>
                        <v-btn @click="increaseQuantity(product._id, category.maxSelection)" :disabled="isMaxQuantityReached(category.maxSelection, product._id)">+</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import { watch } from 'vue';

const props = defineProps<{
  categories: { _id: string; name: string; maxSelection: number }[];
  products: { _id: string; title: string; price: number; category_id: string }[];
  selectedSize: string;
}>();

const quantities = ref<{ [key: string]: number }>({});

const maxQuantities = {
  'P': 3,
  'M': 5,
  'G': 6
};

// Reseta as quantidades quando o tamanho da marmita é alterado
watch(() => props.selectedSize, () => {
  quantities.value = {}; // Reseta todas as quantidades ao mudar o tamanho
});


const totalSelected = computed(() => {
  return Object.values(quantities.value).reduce((acc, quantity) => acc + quantity, 0);
});

function increaseQuantity(productId: string, categoryMaxSelection: number) {
  const currentQuantity = quantities.value[productId] || 0;
  const totalSelectedInCategory = getTotalSelectedInCategory(productId);

  // Verifica se já atingiu o máximo por categoria ou por tamanho da marmita
  if (currentQuantity < categoryMaxSelection && totalSelectedInCategory < categoryMaxSelection && totalSelected.value < maxQuantities[props.selectedSize]) {
    quantities.value[productId] = currentQuantity + 1;
  }
}

function decreaseQuantity(productId: string) {
  const currentQuantity = quantities.value[productId] || 0;
  if (currentQuantity > 0) {
    quantities.value[productId] = currentQuantity - 1;
  }
}

function isMaxQuantityReached(categoryMaxSelection: number, productId: string) {
  const totalSelectedInCategory = getTotalSelectedInCategory(productId);

  return totalSelected.value >= maxQuantities[props.selectedSize] || totalSelectedInCategory >= categoryMaxSelection;
}

// Função para obter o total selecionado em uma categoria
function getTotalSelectedInCategory(productId: string) {
  const product = props.products.find(p => p._id === productId);
  if (!product) return 0;

  return props.products
    .filter(p => p.category === product.category)
    .reduce((acc, p) => acc + (quantities.value[p._id] || 0), 0);
}

function filteredProducts(categoryId: string) {
  return props.products.filter(product => product.category === categoryId);
}
</script>

<style scoped>

</style>
