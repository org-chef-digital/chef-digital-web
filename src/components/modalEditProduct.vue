<template>
    <v-dialog v-model="showModal" persistent max-width="600px">
        <v-card>
            <v-card-title>Edit Product</v-card-title>
            <v-card-text>
                <v-text-field v-model="product.title" label="Nome do produto"></v-text-field>
                <v-text-field v-model="product.price" label="Preço"></v-text-field>
                <v-checkbox v-model="product.availability" label="Available"></v-checkbox>
                <v-btn @click="confirmEditProduct">Save</v-btn>
                <v-btn @click="cancel">Cancel</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        product: {
            required: true,
        },
    },
    data() {
        return {
            showModal: false,
        };
    },
    methods: {
        confirmEditProduct() {
            this.$emit('confirm-edit-product', this.product);
            this.showModal = false;
        },
        cancel() {
            this.$emit('update:modelValue', false);
            this.showModal = false;
        },
    },
});
</script>