<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" app permanent width="550" color="amber-darken-4">
      <v-app-bar-title>Cadastre-se</v-app-bar-title>
      <v-form class="form">
        <v-text-field label="Nome Fantasia" variant="outlined" bg-color="white"></v-text-field>
        <v-text-field label="Telefone (+DDD)" variant="outlined" bg-color="white"></v-text-field>
        <v-text-field label="Email" variant="outlined" bg-color="white"></v-text-field>
        <v-text-field label="Crie sua senha" type="password" variant="outlined" bg-color="white"></v-text-field>
        <v-text-field label="Confirme sua senha" type="password" variant="outlined" bg-color="white"></v-text-field>
        <div class="button-group">
          <v-btn color="red">Cancelar</v-btn>
          <v-btn color="green">Concluir</v-btn>
        </div>
      </v-form>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style>
  .v-app-bar-title {
    color: #000;
    font-family: 'Montserrat Alternates';
    text-align: center;
    margin-top: 5%;
  }

  .v-text-field {
    width: 60%;
  }

  .form {
    margin-top: 8%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    width: 60%;
    margin-top: 8%;
  }
</style>
