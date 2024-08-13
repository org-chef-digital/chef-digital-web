<script>

export default {
    name: 'cartButton',
    data() {
        return {
            open: false,
            status: this.$fetchStatus,
            loading: false
        }
    },
    mounted() {
        this.fetchStatus();
    },
    openChart() {
        this.open = true;
    },
    methods: {
        async fetchStatus() {
            const id = localStorage.getItem('id');
            if (id) {
                try {
                    const response = await restaurantServices.getStatus({ id });
                    this.status = response.data.status;

                    return response;
                } catch (error) {
                    console.log('Failed to fetch status:', error);
                }
            }
        },
    }
}

</script>

<template>
    <v-btn  @click="openCart" color="green">
        <v-icon class="mdi-cart">mdi-cart</v-icon>
    </v-btn>

    <v-dialog v-model="open" max-width="500px">
        <v-card title="Carrinho" prepend-icon="mdi-cart-outline">
            <v-card-subtitle v-if="!status">
                <p>No momento a loja está fechada. Tente mais tarde!</p>
            </v-card-subtitle>
            <v-card-text>
                <v-list>
                    <v-list-item v-for="(product, index) in products" :key="index">
                        <div class="productContainer">
                            <div class="itemContainer">
                                <v-list-item-title>{{ product.name }}</v-list-item-title>
                                <v-list-item-subtitle>R$ {{ (product.price).toFixed(2) }}</v-list-item-subtitle>
                                <v-list-item-subtitle class="ml-2" v-for="sideDish in product.sideDishes"
                                    :key="sideDish.id">
                                    {{ product.sideDishesOptions.find(option => option.id === sideDish).name }}
                                </v-list-item-subtitle>
                            </div>
                            <v-btn icon="mdi-delete" @click="removeProduct(index)" variant="plain" color="red darken-1"
                                density="compact"></v-btn>
                        </div>
                        <v-divider></v-divider>
                    </v-list-item>
                </v-list>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>Subtotal</v-list-item-title>
                        <v-list-item-subtitle class="ml-2">R$ {{ products.reduce((acc, product) => acc + product.price,
                            0).toFixed(2)
                            }}</v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="open = false">Adicionar mais itens</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="finishPurchase" :loading="loading"
                    :disabled="loading || !status">Finalizar compra</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<style scoped></style>