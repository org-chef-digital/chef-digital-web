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
          <v-text-field
            v-model="formData.maxSelection"
            :rules="rules.maxSelection"
            label="Max Selection"
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
import { ru } from 'vuetify/locale';

interface FormData {
  categoryName: string;
  maxSelection: number;
}

export default defineComponent({
  emits: ['update:modelValue', 'save-category'],
  data() {
    return {
      formData: {
        categoryName: '',
        maxSelection: 0,
      } as FormData,
      rules: {
        categoryName: [
          (v: string) => !!v || 'Required',
          (v: string) => !/^\d+$/.test(v) || 'Name cannot be a number',
        ],
        maxSelection: [
          (v: number) => !!v || 'Required',
          (v: number) => v > 0 || 'Max Selection must be greater than 0',
        ],
      },
      isValid: false,
      showModal: false,
    };
  },
  methods: {
    saveCategory() {
      if (this.isValid) {
        this.$emit('save-category', this.formData.categoryName, this.formData.maxSelection);
        this.formData.categoryName = '';
        this.formData.maxSelection = 0;
        this.showModal = false;
      }
    },
    cancel() {
      this.$emit('update:modelValue', false);
      this.formData.categoryName = '';
      this.formData.maxSelection = 0;
      this.showModal = false;
    }
  }
});
</script>
