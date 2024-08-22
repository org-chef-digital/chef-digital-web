<template>
    <v-btn v-if="restaurantOpen" text @click="openDialog" color="green">
        <v-icon class="mdi-cart">mdi-cart</v-icon>
    </v-btn>
    <v-dialog v-model="showFinishBuyModal" max-width="500">
        <v-card title="Carinho" prepend-icon="mdi-cart-outline">
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-list>
                        <v-list-item v-for="product in products" :key="product._id">
                            <v-list-item-content>
                                <v-row>
                                    <v-col>
                                        <v-list-item-title>{{ product.title }}</v-list-item-title>
                                        <v-list-item-subtitle>R$ {{ product.price.toFixed(2) }}</v-list-item-subtitle>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-btn icon="mdi-delete" @click="removeProduct(product._id)" variant="plain"
                                            color="red darken-1" density="compact"></v-btn>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-form ref="form" v-model="valid">
                        <v-radio-group v-model="tipoEnvio" row>
                            <v-radio label="Retirar no Restaurante" value="retirar"></v-radio>
                            <v-radio label="Entrega" value="entrega"></v-radio>
                        </v-radio-group>
                        <v-radio-group v-model="tipoPagamento" row>
                            <v-radio label="Pix" value="pix"></v-radio>
                            <v-radio label="Cartão" value="cartao"></v-radio>
                            <v-radio label="Dinheiro" value="dinheiro"></v-radio>
                            <List :products="products" />
                        </v-radio-group>
                    </v-form>
                </v-form>
            </v-card-text>
            <v-card-actions class="buttonsPurchase">
                <v-btn color="blue" text @click="showFinishBuyModal = false">Adicionar mais itens</v-btn>
                <v-btn color="green darken-1" text @click="finalizarPedido">Finalizar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../services/api';

import { Product } from '@/services/productServices/productTypes';
const products = ref<Product[]>([]);

import { Category } from '@/services/categoryServices/categoryTypes';
const categories = ref<Category[]>([]);


const showFinishBuyModal = ref(false);
const valid = ref(true);
const tipoEnvio = ref<string | null>(null);
const tipoPagamento = ref<string | null>(null);


const restaurantOpen = ref<boolean>(true);
const route = useRoute();
const telefoneRestaurante = ref<string | null>(null);

const openDialog = () => {
    showFinishBuyModal.value = true;
    console.log(products);
};

async function fetchCategories() {
    try {
        const restaurantId = route.params.id;
        const response = await api.get(`/categories/restaurant/${restaurantId}`);
        categories.value = response.data.data;
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    }
};

async function fetchProducts() {
    try {
        const response = await api.get(`/products/all`);
        products.value = response.data.data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

function removeProduct(productId: string) {
    const productIndex = products.value.findIndex(product => product._id === productId);

    if (productIndex !== -1) {
        products.value.splice(productIndex, 1);
    } else {
        console.error('Produto não encontrado no carrinho.');
    }
}


async function checkRestaurantStatus() {
    try {
        const restaurantId = route.params.id;
        const response = await api.get(`/restaurant/${restaurantId}/status`);
        restaurantOpen.value = response.data.data;
    } catch (error) {
        console.error('Erro ao verificar o status do restaurante:', error);
    }
};

async function fetchRestaurantPhone() {
    try {
        const restaurantId = route.params.id;
        const response = await api.get(`/restaurant/${restaurantId}`);
        telefoneRestaurante.value = response.data.data.phone;
    } catch (error) {
        console.error('Erro ao buscar telefone do restaurante:', error);
    }
};

const finalizarPedido = () => {
    if (!tipoEnvio.value || !tipoPagamento.value) {
        alert("Por favor, selecione o tipo de envio e pagamento.");
        return;
    }

    const tipoEnvioTexto = tipoEnvio.value === 'entrega' ? 'Delivery' : 'Retirar no Restaurante';
    const pagamentoTexto = tipoPagamento.value.charAt(0).toUpperCase() + tipoPagamento.value.slice(1);

    if (!telefoneRestaurante.value) {
        alert("Erro ao obter telefone do restaurante.");
        return;
    }

    // Construir a lista de produtos
    const produtosTexto = products.value.map(product => {
        return `${product.title} - R$ ${product.price.toFixed(2)}`;
    }).join(', ');

    let mensagem = `Gostaria de fazer um pedido. Produtos: ${produtosTexto}. Tipo de entrega: ${tipoEnvioTexto}. Forma de pagamento: ${pagamentoTexto}.`;

    if (tipoEnvio.value === 'entrega') {
        mensagem += ` Desejo que seja realizada a entrega do pedido.`;
    }

    const urlWhatsapp = `https://wa.me/+55${telefoneRestaurante.value}?text=${encodeURIComponent(mensagem)}`;
    window.location.href = urlWhatsapp;
};


onMounted(async () => {
    await fetchCategories();
    await checkRestaurantStatus();
    await fetchRestaurantPhone();
    await fetchProducts()

    if (!restaurantOpen.value) {
        categories.value = [];
    }
});
</script>

<style scoped>
.buttonsPurchase {
    justify-content: space-between;
}

.barraNav {
    background-color: #DE6A16;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    gap: 16px;
}
</style>