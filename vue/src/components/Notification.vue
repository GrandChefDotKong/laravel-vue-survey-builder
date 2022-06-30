<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { NotificationType } from '../types/types';

  const store = useStore();
  const notifications = computed(() =>
    store.state.notifications
  )
</script>

<template>
  <div v-for="(notification, index) in notifications" :key="index">
    <div v-if="notification.show" class="fixed w-[300px]
    left-4 bottom-4 py-2 px-4 text-white animate-fade-in-down"
    :class="notification.type === NotificationType.SUCCESS ? 
    'bg-emerald-500' : 'bg-red-500'"
    >
      {{ notification.message }}
    </div>
  </div>
</template>