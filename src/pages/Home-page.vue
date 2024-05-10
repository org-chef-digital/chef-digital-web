<template>
  <v-container>
    <navbar />
    <buttons-categories color="#4CAF50" text="Criar categoria" @click="openModal" />
    <modal-criar v-model="showModal" @save-category="handleSaveCategory" />
    <modal-excluir v-model="showDeleteModal" :category-id="categoryIdToDelete" @confirm-delete="deleteCategory" />
    <modal-editar v-model="showEditModal" :category="categoryToEdit" @confirm-edit="editCategory" />
    <card-categories :categories="categories" @open-edit-modal="openEditModal"
      @open-confirmation-modal="openConfirmationModal" @delete-category="deleteCategory" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Navbar from "../components/navigation-bar.vue"
import ButtonsCategories from '../components/buttonsCategories.vue';
import ModalCriar from '../components/modalCriar.vue';
import ModalExcluir from '../components/modalExcluir.vue';
import ModalEditar from '../components/modalEditar.vue';
import CardCategories from '../components/cardCategories.vue';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
}

export default defineComponent({
  components: {
    ButtonsCategories,
    ModalCriar,
    ModalExcluir,
    ModalEditar,
    Navbar,
    CardCategories,
  },
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      showEditModal: false,
      categoryToEdit: { _id: '', name: '' } as Category,
      categoryIdToDelete: '',
      categories: [] as Category[],
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    openEditModal(category: { _id: string; name: string }) {
      this.categoryToEdit = category;
      this.showEditModal = true;
    },
    openConfirmationModal(categoryId: string) {
      this.categoryIdToDelete = categoryId;
      this.showDeleteModal = true;
    },
    async deleteCategory(categoryId: string) {
      try {
        const response = await axios.delete(`/categories/${categoryId}`);
        this.categories = this.categories.filter((category: Category) => category._id !== categoryId);
        console.log(response.data);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
      }
    },
    async handleSaveCategory(categoryName: string) {
      try {
        const response = await axios.post('/categories', { name: categoryName });
        const newCategory = response.data.data;
        this.categories.push(newCategory);
        console.log(response.data);
        this.showModal = false;
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
      }
    },
    async editCategory(editedCategory: Category) {
      try {
        const response = await axios.put(`/categories/${editedCategory._id}`, { name: editedCategory.name });
        const index = this.categories.findIndex((category: Category) => category._id === editedCategory._id);
        if (index !== -1) {
          this.categories[index].name = editedCategory.name;
        }
        console.log(response.data);
        this.showEditModal = false;
      } catch (error) {
        console.error('Erro ao editar categoria:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('/categories/all');
        this.categories = response.data.data;
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    },
  },
  created() {
    this.fetchCategories();
  },
});
</script>
