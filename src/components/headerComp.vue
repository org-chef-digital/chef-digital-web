<template>
  <v-app-bar color="#FF9944"> 
    <template v-slot:append>
      <adminMenuButton @create-category-1="handleCreateCategory"/>
    </template>
  </v-app-bar>
</template>

<script>
import adminMenuButton from './adminMenuButton.vue';

export default {
  name: 'headerComp',
  components: {
    adminMenuButton,
  },
  data() {

  },
  methods: {
    handleCreateCategory() {
      this.$emit('create-category-2');
  },
},
};
</script>

<style scoped>
.loginContainer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logomarca {
  max-width: 200px;
  max-height: 200px;
  cursor: pointer;
}
</style>