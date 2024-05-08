<template>
    <v-dialog v-model="value">
        <v-card>
            <v-card-title>Excluir categoria</v-card-title>
            <v-card-text>
                <p>Tem certeza que deseja excluir esta categoria?</p>
                <v-btn @click="confirmDelete(true)">Excluir</v-btn>
                <v-btn @click="cancel">Cancelar</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        value: Boolean as PropType<boolean>,
    },
    emits: ['update:modelValue', 'confirm-delete'],
    methods: {
        confirmDelete(confirm: boolean) { // Corrigir para aceitar o argumento confirm
            this.$emit('confirm-delete', confirm); // Emitir evento de confirmação de exclusão
            this.$emit('update:modelValue', false); // Fechar o modal após a confirmação
        },
        cancel() {
            this.$emit('update:modelValue', false); // Fechar o modal ao cancelar
        },
    },
});
</script>