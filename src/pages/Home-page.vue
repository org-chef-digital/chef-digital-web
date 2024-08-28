<template>
  <div class="container">
    <headerComp @create-category-2="openCreateModal" />

    <modal-create v-model="showCreateModal" @save-category="saveCategory" />

    <card-categories :categories="categories" :products="products" 
       @edit-category="editCategory"
       @delete-category="deleteCategory" 
       @save-product="saveProduct"
       @delete-product="deleteProduct"
       @edit-product="editProduct"  
      />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from '../services/api';
import headerComp from '../components/headerComp.vue';
import modalCreate from '../components/modalCreate.vue';
import modalEdit from '../components/modalEdit.vue';
import cardCategories from '../components/cardCategories.vue';

import { Category } from '@/services/categoryServices/categoryTypes';
import { Product } from '@/services/productServices/productTypes';

export default defineComponent({
  components: {
    headerComp,
    modalCreate,
    modalEdit,
    cardCategories, 
  },
  data() {
    return {
      showCreateModal: false,
      showEditModal: false,
      categoryToEdit: { _id: '', name: '' } as Category,
      categories: [] as Category[],
      products: [] as Product[],
    };
  },
  methods: {
    openCreateModal() {
      this.showCreateModal = true;
    },

    async deleteCategory(categoryId: string) {
      try {
        const response = await api.delete(`/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });
        this.categories = this.categories.filter((category: Category) => category._id !== categoryId);
      } catch (error) {
        console.error('Error when deleting category:', error);
      }
    },
    async deleteProduct(productId: string) {
      try {
        const response = await api.delete(`/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });
        this.products = this.products.filter((product: Product) => product._id !== productId);
      } catch (error) {
        console.error('Error when deleting product:', error);
      }
    },

    async saveCategory(categoryName: string) {
      try {
        const restaurantId = localStorage.getItem("id");
        const response = await api.post('/categories', { name: categoryName, restaurantId }, {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });
        const newCategory = response.data.data;
        this.categories.push(newCategory);
        this.showCreateModal = false;
      } catch (error) {
        console.error('Error creating category:', error);
      }
    },

    async saveProduct(productTitle: string, productPrice: number, availability: boolean, categoryId: string) {
      try {
        const restaurantId = localStorage.getItem("id");
        const response = await api.post('/products/new', { title: productTitle, price: productPrice, availability: availability, restaurantId, categoryId }, {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });
        const newProduct = response.data.data;
        this.products.push(newProduct);
        this.showCreateProductModal = false;
      } catch (error) {
        console.error('Error creating product:', error);
      }
    },
    async editCategory(editedCategory: Category) {
      try {
        const response = await api.put(`/categories/${editedCategory._id}`, { name: editedCategory.name }, {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });
        const index = this.categories.findIndex((category: Category) => category._id === editedCategory._id);
        if (index !== -1) {
          this.categories[index].name = editedCategory.name;
        }
        this.showEditModal = false;
      } catch (error) {
        console.error('Erro when editing category:', error);
      }
    },
    async editProduct(editedProduct: Product) {
      try {
        const response = await api.put(`/products/${editedProduct._id}`, { title: editedProduct.title, price: editedProduct.price, availability: editedProduct.availability }, {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });
        const index = this.products.findIndex((product: Product) => product._id === editedProduct._id);
        if (index !== -1) {
          this.products[index].title = editedProduct.title;
          this.products[index].price = editedProduct.price;
          this.products[index].availability = editedProduct.availability;
        }
        this.showEditProductModal = false;
      } catch (error) {
        console.error('Erro when editing product:', error);
      }
    },

    async fetchCategories() {
      try {
        const restaurantId = localStorage.getItem("id");
        const response = await api.get(`/categories/restaurant/${restaurantId}`);
        this.categories = response.data.data;
      } catch (error) {
        console.error('Erro when searching category:', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await api.get(`/products/all/`);
        this.products = response.data.data;
      } catch (error) {
        console.error('Erro when searching product:', error);
      }
    },
    getToken() {
      return localStorage.getItem('token');
    },
  },
  created() {
    this.fetchCategories();
    this.fetchProducts();
  },
});
</script>
