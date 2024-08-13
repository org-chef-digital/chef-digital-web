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
              <v-col cols="auto">
                <v-btn class="ml-6" @click="openCreateProductsModal(category._id)">
                  <v-icon class="mr-4">mdi-plus-box-outline</v-icon>
                  <span>Adicionar</span>
                </v-btn>
                <v-btn @click="openEditModal(category)" class="ml-6">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="openConfirmationModal(category._id)" class="ml-6">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="product in products" :key="product._id" cols="12">
                <v-card>
                  <v-card-title>
                    <v-row align="center" justify="space-between" class="w-100">
                      <v-col cols="auto">
                        {{ product.title }}
                      </v-col>
                      <v-col cols="auto">
                        <v-btn @click="openEditProductModal(product)" class="ml-6">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn class="ml-6" @click="openDeleteProductModal(product._id)">
                          <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <span>Preço: R$ {{ product.price }}</span>
                      </v-col>
                      <v-col cols="12">
                        <span>Disponível: {{ product.availability ? 'Sim' : 'Não' }}</span>
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
    <modal-delete v-model="showDeleteModal" :category-id="categoryIdToDelete" @confirm-delete="deleteCategory" />
    <modal-edit v-model="showEditModal" :category="categoryToEdit" @confirm-edit="editCategory" />

    <modal-create-product v-model="showCreateProductModal" :category-id="categoryIdToProduct" @save-product="saveProduct" />
    <modal-delete-product v-model="showDeleteProductModal" :product-id="productIdToDelete" @confirm-delete-product="deleteProduct" /> 
    <modal-edit-product v-model="showEditProductModal" :product="productToEdit" @confirm-edit-product="editProduct" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import modalDelete from './modalDelete.vue';
import modalCreateProduct from './modalCreateProduct.vue';
import modalDeleteProduct from './modalDeleteProduct.vue';
import modalEditProduct from './modalEditProduct.vue';
import modalEdit from './modalEdit.vue';

export default defineComponent({
  props: {
    categories: {
      type: Array as PropType<{ _id: string; name: string }[]>,
      required: true,
    },
    products: {
      type: Array as PropType<{ restaurant_id: string; availability: boolean; title: string; _id: string; price: number; category_id: string }[]>,
      required: true,
    },
  },
  components: {
    modalDelete,
    modalCreateProduct,
    modalDeleteProduct,
    modalEditProduct,
    modalEdit,
  },
  data() {
    return {
      showEditModal: false,
      showDeleteModal: false,
      showCreateProductModal: false,
      showDeleteProductModal: false,
      showEditProductModal: false,
      categoryIdToDelete: '',
      categoryToEdit: { _id: '', name: '' },
      categoryIdToProduct: '',
      productIdToDelete: '',
      productToEdit: { restaurant_id: '', availability: false, title: '', _id: '', price: 0, category_id: '' },
    };
  },
  methods: {
    openConfirmationModal(categoryId: string) {
      this.categoryIdToDelete = categoryId;
      this.showDeleteModal = true;
      console.log(categoryId);
    },
    deleteCategory(categoryId: string) {
      this.$emit('delete-category', categoryId);
      this.showDeleteModal = false;
    },

    openCreateProductsModal(categoryId: string) {
      this.categoryIdToProduct = categoryId;
      this.showCreateProductModal = true;
    },
    saveProduct(productName: string, productPrice: number, availability: boolean, categoryId: string) {
      this.$emit('save-product', productName, productPrice, availability, categoryId);
      this.$emit('passing-id', categoryId);
      this.showCreateProductModal = false;
    },

    openDeleteProductModal(productId: string) {
      this.productIdToDelete = productId;
      this.showDeleteProductModal = true;
      console.log(productId);
    },
    deleteProduct(productId: string) {
      this.$emit('delete-product', productId);
      this.showDeleteProductModal = false;
    },

    openEditModal(category: { _id: string; name: string }) {
      this.categoryToEdit = category;
      this.showEditModal = true;
    },
    editCategory(category: { _id: string; name: string }) {
      this.$emit('edit-category', category);
      this.showEditModal = false;
    },

    openEditProductModal(product: { restaurant_id: string; availability: boolean; title: string; _id: string; price: number; category_id: string }) {
      this.productToEdit = product;
      this.showEditProductModal = true;
    },
    editProduct(product: { restaurant_id: string; availability: boolean; title: string; _id: string; price: number; category_id: string }) {
      this.$emit('edit-product', product);
      this.showEditProductModal = false;
    },


  },
});
</script>

<style scoped>
.products {
  width: 800px;
  background-color: cornflowerblue;
  border: 1px solid black;
}
</style>
