import { createRouter, createWebHistory } from 'vue-router'
import Signin from '../views/Signin.vue';
import Dashboard from '../views/Dashboard.vue';
import Surveys from '../views/Surveys.vue';
import Signup from '../views/Signup.vue';
import DefaultLayout from '../components/DefaultLayout.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    children: [
      { path: '/dashboard', name: 'dashboard', component: Dashboard },
      { path: '/surveys', name: 'surveys', component: Surveys },
    ]
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
