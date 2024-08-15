<template>
  <v-container>
    <v-row>
      <v-col v-for="category in categories" :key="category.id" cols="12">
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
              <v-col v-for="product in filteredProducts(category.id)" :key="product._id" cols="12">
                <v-card>
                  <v-card-title>
                    <v-row align="center" justify="space-between" class="w-100">
                      <v-col cols="auto">
                        {{ product.title }}
                      </v-col>
                      <v-col cols="auto">
                        <v-btn @click="decreaseQuantity(product._id)" :disabled="quantities[product._id] <= 0">-</v-btn>
                        <span>{{ quantities[product._id] || 0 }}</span>
                        <v-btn @click="increaseQuantity(product._id)" :disabled="isMaxQuantityReached()">+</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <span>Preço: R$ {{ product.price.toFixed(2) }}</span>
                      </v-col>
                    </v-row>
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

const props = defineProps<{
  categories: { id: string; name: string }[];
  products: { _id: string; title: string; price: number; category_id: string }[];
  selectedSize: string;
}>();

const quantities = ref<{ [key: string]: number }>({});

const maxQuantities = {
  'P': 3,
  'M': 5,
  'G': 6
};

const totalSelected = computed(() => {
  return Object.values(quantities.value).reduce((acc, quantity) => acc + quantity, 0);
});

function increaseQuantity(productId: string) {
  const currentQuantity = quantities.value[productId] || 0;
  if (currentQuantity < maxQuantities[props.selectedSize] && totalSelected.value < maxQuantities[props.selectedSize]) {
    quantities.value[productId] = currentQuantity + 1;
  }
}

function decreaseQuantity(productId: string) {
  const currentQuantity = quantities.value[productId] || 0;
  if (currentQuantity > 0) {
    quantities.value[productId] = currentQuantity - 1;
  }
}

function isMaxQuantityReached() {
  return totalSelected.value >= maxQuantities[props.selectedSize];
}

function filteredProducts(categoryId: string) {
  return props.products.filter(product => product.category_id === categoryId);
}
</script>

<style scoped>

</style>
