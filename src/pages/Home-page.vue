<!-- Home-page -->

<template>
  <v-container>
    <navbar />
    <buttons-categories color="#4CAF50" text="Criar categoria" @click="openModal" />
    <modal-criar v-model="showModal" @save-category="saveCategory" />
    <modal-editar v-model="showEditModal" :category="categoryToEdit" @confirm-edit="editCategory(categoryToEdit)" />

    <modal-excluir v-model="showDeleteModal" :category-id="categoryIdToDelete" @confirm-delete="deleteCategory" />
    <card-categories :categories="categories" @open-edit-modal="openEditModal"
      @open-confirmation-modal="openConfirmationModal" />
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

export default defineComponent({
  components: {
    ButtonsCategories,
    ModalCriar,
    ModalExcluir,
    ModalEditar,
    Navbar,
    CardCategories,
  },
  setup() {
    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const showEditModal = ref(false);
    const categoryToEdit = ref({ _id: '', name: '' });
    const categoryIdToDelete = ref('');
    const categories = ref([]); // Inicializa a lista de categorias vazia

    const openModal = () => {
      showModal.value = true;
    };

    const openEditModal = (category: { _id: string; name: string }) => {
      categoryToEdit.value = category;
      showEditModal.value = true;
    };


    const openConfirmationModal = (categoryId: string) => {
      categoryIdToDelete.value = categoryId;
      showDeleteModal.value = true;
    };

    const saveCategory = async (categoryName: string) => {
      try {
        const response = await axios.post('/categories', {
          name: categoryName,
        });
        console.log(response.data); // Verifica a resposta da API
        const newCategory = response.data.data; // Obtém a nova categoria criada da resposta
        categories.value.push(newCategory as never); // Adiciona a nova categoria ao array existente de categorias
        showModal.value = false; // Fecha o modal após salvar
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
      }
    };

    const editCategory = async (editedCategory: { _id: string; name: string }) => {
      try {
        await axios.put(`/categories/${editedCategory._id}`, { name: editedCategory.name });
        fetchCategories();
        showEditModal.value = false;
      } catch (error) {
        console.error('Erro ao editar categoria:', error);
      }
    };

    const deleteCategory = async (categoryId: string) => {
      try {
        await axios.delete(`/categories/${categoryId}`);
        categories.value = categories.value.filter((category: any) => category._id !== categoryId);
        showDeleteModal.value = false;
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories/all');
        console.log(response.data); // Verifica a resposta da API
        categories.value = response.data.data; // Atribui o array de categorias à propriedade categories
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    // Chama a função para buscar as categorias ao carregar a página
    fetchCategories();

    return {
      showModal,
      showDeleteModal,
      showEditModal,
      categoryIdToDelete,
      categoryToEdit,
      categories,
      openModal,
      openConfirmationModal,
      saveCategory,
      deleteCategory,
      openEditModal,
      editCategory,
    };
  },
});
</script>
