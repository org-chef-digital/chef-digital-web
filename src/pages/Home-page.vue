<template>
  <div class="container">
    <headerComp @create-category-2="openCreateModal" />

    <modal-create v-model="showCreateModal" @save-category="saveCategory" />
    <modal-delete v-model="showDeleteModal" :category-id="categoryIdToDelete" @confirm-delete="deleteCategory" />
    <modal-edit v-model="showEditModal" :category="categoryToEdit" @confirm-edit="editCategory" />

    <card-categories :categories="categories" @open-edit-modal="openEditModal"
      @open-confirmation-modal="openConfirmationModal" @delete-category="deleteCategory" />
  </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import { api } from '../services/api';
import headerComp from '../components/headerComp.vue';
import modalDelete from '../components/modalDelete.vue'
import modalCreate from '../components/modalCreate.vue';
import modalEdit from '../components/modalEdit.vue';
import cardCategories from '../components/cardCategories.vue';

interface Category {
  _id: string;
  name: string;
}

export default defineComponent({
  components: {
    headerComp,
    modalDelete,
    modalCreate,
    modalEdit,
    cardCategories, 
  },
  data() {
    return {
      showCreateModal: false,
      showDeleteModal: false,
      showEditModal: false,
      categoryToEdit: { _id: '', name: '' } as Category,
      categoryIdToDelete: '',
      categories: [] as Category[],
    };
  },
  methods: {
    openCreateModal() {
      this.showCreateModal = true;
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
        const response = await api.delete(`/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });
        this.categories = this.categories.filter((category: Category) => category._id !== categoryId);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error when deleting category:', error);
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
    async fetchCategories() {
      try {
        const restaurantId = localStorage.getItem("id");
        const response = await api.get(`/categories/restaurant/${restaurantId}`);
        this.categories = response.data.data;
      } catch (error) {
        console.error('Erro when searching category:', error);
      }
    },
    getToken() {
      return localStorage.getItem('token');
    }
  },
  created() {
    this.fetchCategories();
  },
});
</script>
