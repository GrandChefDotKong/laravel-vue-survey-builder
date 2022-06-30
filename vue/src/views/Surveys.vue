<script setup lang="ts">
import PageComponent from '../components/PageComponent.vue';
import store from '../store';
import { Survey } from '../types/types';
import { computed } from 'vue';
import SurveyListItem from '../components/editor/SurveyListItem.vue';

  const surveys = computed(() => store.state.surveys);
  const links = computed(() => store.state.links);

  store.dispatch('getSurveys');

  const getForPage = (link: any) => {
    if(!link.url || link.active) return;

    store.dispatch('getSurveys', { url: link.url });
  }
</script>

<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between flex-row items-center">
        <h1 class="text-3xl font-bold text-gray-900">
          Surveys
        </h1>
        <router-link :to="{ name: 'survey-create' }"
          class="py-2 px-3 text-white bg-emerald-500 rounded-md
          hover:bg-emerald-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
            class="h-4 w-4 -mt-1 inline-block" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path stroke-linecap="round" 
              stroke-linejoin="round" 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          Add new Survey
        </router-link>
      </div>
    </template>
    <div>
      <div class="grid grid-cols-1 gap-3 
        sm:grid-cols-2 md:grid-cols-3"
      >
        <survey-list-item :surveys="surveys" />
      </div>
      <div class="flex justify-center mt-5">
        <nav aria-label="Pagination" class="relative z-0 inline-flex
        justify-center rounded-md shadow-sm">
          <button
            v-for="(link, index) of links"  
            v-html="link.label"
            :key="index" 
            :disabled="!link.url" 
            @click="getForPage(link)"
            class="relative inline-flex items-center px-4 py-2 border 
            text-sm font-medium whitespace-nowrap" 
            :class="[link.active ? `z-10 bg-indigo-50 border-indigo-500
            text-indigo-600` : `bg-white border-gray-300
            text-gray-500 hover:bg-gray-50`, 
            (index === 0 || index === links.length - 1 ) ? 'rounded' : '']"
          >
          </button>
        </nav>
      </div>
    </div>
  </page-component>
</template>











