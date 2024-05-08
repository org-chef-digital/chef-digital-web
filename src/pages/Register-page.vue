<template>
  <v-responsive aspect-ratio="16/9">
    <v-container class="page">
      <v-navigation-drawer v-model="drawer" app permanent width="385" color="#FF9943">
        <v-app-bar-title>Cadastre-se</v-app-bar-title>
        <forms-registration />
        <div class="login">
          <h4>Já tem uma conta?</h4>
          <v-btn class="returnLogin" color="primary" @click="backStage">Faça login</v-btn>
        </div>
      </v-navigation-drawer>
    </v-container>
  </v-responsive>
</template>

<script>
import { defineComponent } from 'vue';
import formsRegistration from '../components/formsRegistration.vue';

export default defineComponent({
  name: 'register',
  components: {
    formsRegistration,
  },
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    backStage() {
      this.$router.push({ name: 'login' });
    },
  },
});
</script>

<style scoped>
.page {
  background: url('../assets/backgron1.jpg');
  background-size: cover;
  height: 100vh;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8%;
}

h4 {
  font-family: 'Roboto', sans-serif;
  color: #000;
  text-align: center;
}

.v-app-bar-title {
  color: #000;
  font-size: 25px;
  font-family: 'Roboto', sans-serif;
  margin-top: 15%;
  text-align: center;
}

.returnLogin {
  margin-top: 2%;
}
</style>
