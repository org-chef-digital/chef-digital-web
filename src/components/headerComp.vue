<template v-slot:append>
  <div class="barraNav"> 
    <img src="../../public/logo.png" alt="logo" class="logomarca">
    <adminMenuButton @create-category-1="handleCreateCategory"/>
  </div>
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
.barraNav {
  background-color: #DE6A16;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;
}

.loginContainer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logomarca {
  max-width: 350px;
  max-height: 350px;
  cursor: pointer;
  gap: 100px;
}
</style>