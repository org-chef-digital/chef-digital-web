<template>
    <v-container>
        <v-row>
            <v-col v-for="(category, index) in categories" :key="category._id">
                <v-card>
                    <v-card-title>{{ category.name }}</v-card-title>
                    <v-btn @click="editCategory(category)">Editar</v-btn>
                    <v-btn @click="openModal(category._id)">Excluir</v-btn>

                </v-card>
                <v-card class="produtos">
                    <!-- Conteúdo dos produtos relacionados à categoria -->
                </v-card>
            </v-col>
        </v-row>

        <modal-excluir v-model:modelValue="showModal" @confirm-delete="deleteCategory" />
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import ModalExcluir from './modalExcluir.vue';
import axios from 'axios';

export default defineComponent({
    components: {
        ModalExcluir,
    },
    props: {
        categories: {
            type: Array as PropType<{ _id: string; name: string }[]>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const showModal = ref(false);

        const editCategory = (category) => {
            console.log('Editar:', category.name);
        };

        const openModal = (id: string) => {
            showModal.value = true;
        };

        const deleteCategory = async (confirm: boolean, id: string) => {
            if (confirm) {
                try {
                    console.log('Excluindo categoria:', id); // Use 'id' ao invés de 'this._id'
                    const response = await axios.delete(`/categories/${id}`);
                    console.log(response.data);
                    // Remove a categoria do array após a exclusão bem-sucedida
                    const updatedCategories = props.categories.filter((cat) => cat._id !== id);
                    emit('category-deleted', updatedCategories);
                    showModal.value = false;
                } catch (error) {
                    console.error('Erro ao excluir categoria:', error);
                }
            } else {
                showModal.value = false;
            }
        };



        return {
            showModal,
            editCategory,
            openModal,
            deleteCategory,
        };
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