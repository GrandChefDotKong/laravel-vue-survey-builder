<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

  const store = useStore();
  const user = computed(() => store.state.user)

</script>

<template>
  <router-view>   
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
