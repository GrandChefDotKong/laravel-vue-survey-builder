<script setup lang="ts">
  import PageComponent from '../components/PageComponent.vue';

</script>

<template>
  <page-component>
    <template v-slot:header>
      <div class="flex-justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
      </div>
    </template>
  </page-component>
</template>

