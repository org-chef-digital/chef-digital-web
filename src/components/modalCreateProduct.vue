<template>
    <v-dialog v-model="showModal" persistent max-width="600px">
        <v-card>
            <v-card-title>Product Name</v-card-title>
            <v-card-text>
                <v-form v-model="isValid">
                    <v-text-field v-model="formData.productName" :rules="rules.productName" label="Product Name"
                        required></v-text-field>
                    <v-text-field v-model="formData.productPrice" :rules="rules.productPrice" prefix="$"
                        required></v-text-field>
                    <v-checkbox v-model="formData.availability" label="Available"></v-checkbox>
                    <v-btn @click="saveProduct" :disabled="!isValid">Save</v-btn>
                    <v-btn @click="cancel">Cancel</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface FormData {
    productName: string;
    productPrice: number;
    availability: boolean;
}

export default defineComponent({
    props: {
        categoryId: String,
    },
    emits: ['update:modelValue', 'save-category'],
    data() {
        return {
            formData: {
                productName: '',
                productPrice: 0,
                availability: true,
            } as FormData,
            rules: {
                productName: [
                    (v: string) => !!v || 'Required',
                    (v: string) => !/^\d+$/.test(v) || 'Name cannot be a number',
                ],
                productPrice: [
                    (v: number) => !!v || 'Required',
                    (v: number) => v > 0 || 'Price must be greater than 0',
                ],
            },
            isValid: false,
            showModal: false,
        };
    },
    methods: {
        saveProduct() {
            if (this.isValid) {
                this.$emit('save-product', this.formData.productName, this.formData.productPrice, this.formData.availability, this.categoryId);
                console.log(this.categoryId);
                this.formData.productName = '';
                this.formData.productPrice = 0;
                this.$emit('update:modelValue', false);
            }
        },
        cancel() {
            this.$emit('update:modelValue', false);
            this.formData.productName = '';
            this.formData.productPrice = 0;
        }
    }
});
</script>