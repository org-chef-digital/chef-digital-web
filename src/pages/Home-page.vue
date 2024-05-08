<template>
  <v-container>
    <navbar />
    <buttons-categories color="#4CAF50" text="Criar categoria" @click="openModal" />
    <modal-criar v-model="showModal" @save-category="saveCategory" />
    <card-categories :categories="categories" @delete-category="deleteCategory" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import navbar from "../components/navigation-bar.vue"
import ButtonsCategories from '../components/buttonsCategories.vue';
import ModalCriar from '../components/modalCriar.vue';
import CardCategories from '../components/cardCategories.vue';
import axios from 'axios';

export default defineComponent({
  components: {
    ButtonsCategories,
    ModalCriar,
    navbar,
    CardCategories,
  },
  setup() {
  const showModal = ref(false);
  const categories = ref([]); // Inicializa a lista de categorias vazia

  const openModal = () => {
    showModal.value = true;
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

  const deleteCategory = (categoryId: number) => {
    // Lógica para excluir a categoria com o ID recebido
    categories.value = categories.value.filter((category: { id: string }) => category.id !== String(categoryId));
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
    categories,
    openModal,
    saveCategory,
    deleteCategory,
  };
},
});
</script>
