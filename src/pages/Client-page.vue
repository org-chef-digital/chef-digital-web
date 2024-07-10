<template>
  <v-responsive aspect-ratio="9/16">
    <v-container>
      <v-app-bar color="#FF9943">
        <v-img src="../assets/client-logo.png" width="100px" height="50px"></v-img>
      </v-app-bar>
      <template v-if="restaurantOpen">
        <h2>Menu do dia</h2>
        <List :categories="categories" />
      </template>
      <template v-else>
        <p>O restaurante está fechado no momento. Por favor, volte mais tarde.</p>
      </template>
      <v-btn class="finishBtn" @click="openDialog">Finalizar Pedido</v-btn>
      <v-dialog v-model="showFinishBuyModal" max-width="500">
        <v-card>
          <v-card-title class="headline">Finalizar Pedido</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-radio-group v-model="tipoEnvio" row>
                <v-radio label="Retirar no Restaurante" value="retirar"></v-radio>
                <v-radio label="Entrega" value="entrega"></v-radio>
              </v-radio-group>
              <v-radio-group v-model="tipoPagamento" row>
                <v-radio label="Pix" value="pix"></v-radio>
                <v-radio label="Cartão" value="cartao"></v-radio>
                <v-radio label="Dinheiro" value="dinheiro"></v-radio>
              </v-radio-group>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="showFinishBuyModal = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="finalizarPedido">Finalizar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import List from '../components/categoriesList.vue';
import { api } from '../services/api';

const showFinishBuyModal = ref(false);
const valid = ref(true);
const tipoEnvio = ref<string | null>(null);
const tipoPagamento = ref<string | null>(null);
const categories = ref<Category[]>([]);
const restaurantOpen = ref<boolean>(true);
const route = useRoute();
const router = useRouter();
const telefoneRestaurante = ref<string | null>(null);

const openDialog = () => {
  showFinishBuyModal.value = true;
};

async function fetchCategories() {
  try {
    const restaurantId = route.params.id;
    const response = await api.get(`/categories/restaurant/${restaurantId}`);
    categories.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
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
}

async function fetchRestaurantPhone() {
  try {
    const restaurantId = route.params.id;
    const response = await api.get(`/restaurant/${restaurantId}`);
    telefoneRestaurante.value = response.data.data.phone;
  } catch (error) {
    console.error('Erro ao buscar telefone do restaurante:', error);
  }
}

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

  let mensagem = `Gostaria de fazer um pedido. Tipo de entrega: ${tipoEnvioTexto}. Forma de pagamento: ${pagamentoTexto}.`;
  if (tipoEnvio.value === 'entrega') {
    mensagem += `Desejo que seja realizada a entrega do pedido.`;
  }

  const urlWhatsapp = `https://wa.me/+55${telefoneRestaurante.value}?text=${encodeURIComponent(mensagem)}`;
  window.location.href = urlWhatsapp;
};

onMounted(async () => {
  await fetchCategories();
  await checkRestaurantStatus();
  await fetchRestaurantPhone();

  if (!restaurantOpen.value) {
    categories.value = [];
  }
});
</script>

<style scoped>
.finishBtn {
  background-color: rgb(255, 0, 0);
  color: white;
  width: 233px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>
