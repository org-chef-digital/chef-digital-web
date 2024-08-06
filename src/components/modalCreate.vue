<template>
  <v-dialog v-model="showModal" persistent max-width="600px">
    <v-card>
      <v-card-title>Category Name</v-card-title>
      <v-card-text>
        <v-form v-model="isValid">
          <v-text-field
            v-model="formData.categoryName"
            :rules="rules.categoryName"
            label="Category Name"
            required
          ></v-text-field>
          <v-btn @click="saveCategory" :disabled="!isValid">Save</v-btn>
          <v-btn @click="cancel">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface FormData {
  categoryName: string;
}

export default defineComponent({
  emits: ['update:modelValue', 'save-category'],
  data() {
    return {
      formData: {
        categoryName: '',
      } as FormData,
      rules: {
        categoryName: [
          (v: string) => !!v || 'Required',
          (v: string) => !/^\d+$/.test(v) || 'Name cannot be a number',
        ],
      },
      isValid: false,
      showModal: false,
    };
  },
  methods: {
    saveCategory() {
      if (this.isValid) {
        this.$emit('save-category', this.formData.categoryName);
        this.formData.categoryName = '';
        this.showModal = false;
      }
    },
    cancel() {
      this.formData.categoryName = '';
      this.showModal = false;
    }
  }
});
</script>
