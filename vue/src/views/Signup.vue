<script setup lang="ts">
import { LockClosedIcon } from '@heroicons/vue/solid';
import router from '../router';
import store from '../store';

  type User = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  }

  let user: User = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const signup = () => {
    store.dispatch('signup', user).then((res) => {
      router.push({ name: 'dashboard'});
    })
  }
</script>

<template>
  <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for Free</h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      {{ ' ' }}
      <router-link :to="{ name: 'signin' }" class="font-medium text-indigo-600 hover:text-indigo-500"> 
        sign in if you aleardy have an account
      </router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit.prevent="signup">
    <input type="hidden" name="remember" value="true" />
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="full-name" class="sr-only">Name</label>
        <input id="full-name" name="email" v-model="user.name" type="text" autocomplete="name" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
      </div>
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" v-model="user.email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" v-model="user.password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
      </div>
      <div>
        <label for="password_confirmation" class="sr-only">Password Confirmation</label>
        <input id="password_confirmation" v-model="user.password_confirmation" name="password_confirmation" type="password" autocomplete="current-password_confirmation" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password Confirmation" />
      </div>
    </div>
    <div>
      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>
        Sign Up
      </button>
    </div>
  </form>
</template>

