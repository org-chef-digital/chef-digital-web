<template>
  <v-container>
    <v-row>
      <v-col v-for="category in categories" :key="category._id">
        <v-card>
          <v-card-title>
            <v-row align="center" justify="space-between" class="w-100">
              <v-col cols="auto">
                {{ category.name }}
              </v-col>
              <v-col cols="auto">
                <v-btn class="ml-6">
                  <v-icon class="mr-4">mdi-plus-box-outline</v-icon>
                  <span>Adicionar</span>
                </v-btn>
                <v-btn @click="openEditModal(category)"  class="ml-6">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="openConfirmationModal(category._id)"  class="ml-6">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card class="products">
            <!--Products here-->
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <modal-Delete v-model="showDeleteModal" :category-id="categoryIdToDelete" @confirm-delete="deleteCategory" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

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
.products {
  width: 800px;
  background-color: cornflowerblue;
  border: 1px solid black;
}
</style>
