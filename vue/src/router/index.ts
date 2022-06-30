import { createRouter, createWebHistory } from 'vue-router'
import Signin from '../views/Signin.vue';
import Dashboard from '../views/Dashboard.vue';
import Surveys from '../views/Surveys.vue';
import Signup from '../views/Signup.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';
import SurveysView from '../views/SurveyView.vue';
import SurveyPublicView from '../views/SurveyPublicView.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '/dashboard', name: 'dashboard', component: Dashboard },
      { path: '/surveys', name: 'surveys', component: Surveys },
      { path: '/surveys/create', name: 'survey-create', component: SurveysView },
      { path: '/surveys/:id', name: 'survey-view', component: SurveysView },
    ]
  },
  {
    path: '/public',
    name: 'public',
    component: AuthLayout,
    children: [
      { path: '/survey/:slug', name: 'survey-public-view', component: SurveyPublicView, },
    ],
  },
  {
    path: '/auth',
    redirect: '/signin',
    name: 'auth',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      { path: '/signin', name: 'signin', component: Signin, },
      { path: '/signup', name: 'signup', component: Signup, },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !store.state.user.token) {
    next({ name: 'signin' });
  } else if(store.state.user.token && to.meta.isGuest) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;



















