import { createStore } from "vuex";
import axiosClient from '../composables/axios';
import { QuestionType, Survey } from '../types/types';

  type State = {
    user: {
      data: {
        name: string,
        email: string,
        imageUrl: string,
      } | {},
      token: string | null
    },
    surveys: Survey[],
  }

const store = createStore({
  state: {
    user: {
      data: {} ,
      token: sessionStorage.getItem('TOKEN'),
    },
    surveys: [{

      id: 'Laravel 9',
      title: 'Laravel 9',
      description: `Consectetur esse aliquip culpa mollit amet ad culpa 
        dolor occaecat velit fugiat. Aliqua tempor laborum consequat occaecat 
        dolor. Deserunt incididunt qui laborum aliqua reprehenderit in magna`,
      image: 'https://raw.githubusercontent.com/agungksidik/public-assets/master/logo/laravel-logo.png',
      status: false,
      expire_date: null,
      questions: [
        {
          id: 1,
          type: QuestionType.TEXT,
          options: null,
          question: 'are you happy today ?',
          description: `lorem Consectetur esse aliquip culpa mollit amet ad culpa 
          dolor occaecat velit fugiat`
        },
      ],
    },
    ],
  } as State,
  getters: {},
  actions: {
    signup({ commit }, user) {
      return axiosClient.post('/signup', user).then(({ data }) => {
        commit('setUser', data);
        return data;
      });
    },
    signin({ commit }, user) {
      return axiosClient.post('/signin', user).then(({ data }) => {
        commit('setUser', data);
        return data;
      });
    },
    signout({ commit }) {
      return axiosClient.post('/signout').then((res) => {
        commit('signout');
        return res;
      });
    },
  },
  mutations: {
    signout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN');
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      if(!userData.token) return;
      
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {}

});

export default store;

