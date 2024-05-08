<template>
    <v-btn :style="buttonStyle">{{ text }}</v-btn>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      color: {
        type: String,
        default: 'primary',
      },
      text: {
        type: String,
        default: 'Button',
      },
    },
    computed: {
      buttonStyle() {
        return {
          borderColor: this.color,
          borderWidth: '2px',
          borderStyle: 'solid',
        };
      },
    },
  });
  </script>