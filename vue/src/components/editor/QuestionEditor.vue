<script setup lang="ts">
import { ref } from 'vue';

  const props = defineProps({
    question: Object,
    index: Number,
  });
  const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion']);

  const model = ref(JSON.parse(JSON.stringify(props.question)));

</script>

<template>
  <div class="flex items-center justify-between">
    <h3 v-if="index" class="text-lg font-bold">
      {{ index + 1 }}. {{ model.question }}
    </h3>
    <div class="flex items-center">

    </div>
  </div>
  <div class="grid gap-3 grid-cols-12">
    
  </div>
</template>