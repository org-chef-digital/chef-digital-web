<template>
  <v-container>
    <v-row>
      <v-col v-for="category in categories" :key="category._id">
        <v-card>
          <v-card-title>{{ category.name }}</v-card-title>
          <v-btn @click="openEditModal(category)">Editar</v-btn>
          <v-btn @click="openConfirmationModal(category._id)">Excluir</v-btn>
        </v-card>
        <v-card class="produtos">
          <!-- Conteúdo dos produtos relacionados à categoria -->
        </v-card>
      </v-col>
    </v-row>
    <modal-excluir v-model="showDeleteModal" :category-id="categoryIdToDelete" @confirm-delete="deleteCategory" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    categories: {
      type: Array as PropType<{ _id: string; name: string }[]>,
      required: true,
    },
  },
  data() {
    return {
      showDeleteModal: false,
      categoryIdToDelete: '',
    };
  },
  methods: {
    openConfirmationModal(categoryId: string) {
      this.categoryIdToDelete = categoryId;
      this.showDeleteModal = true;
    },
    deleteCategory(categoryId: string) {
      this.$emit('delete-category', categoryId);
      this.showDeleteModal = false;
    },
    openEditModal(category: { _id: string; name: string }) {
      this.$emit('open-edit-modal', category);
    }
  },
});
</script>

<style scoped>
.produtos {
  width: 800px;
  background-color: cornflowerblue;
  border: 1px solid black;
}
</style>
