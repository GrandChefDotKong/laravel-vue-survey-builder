import { createStore } from "vuex";
import axiosClient from '../composables/axios';
import { QuestionType, Survey, Notification, NotificationType, Dashboard } from '../types/types';

  type State = {
    user: {
      data: {
        name: string,
        email: string,
        imageUrl: string,
      } | {},
      token: string | null
    },
    dashboard: Dashboard
    currentSurvey: {
      loading: boolean,
      survey: Survey,
    }
    links: any[],
    surveys: Survey[],
    notifications: Notification[],
  }

const store = createStore({
  state: {
    user: {
      data: {} ,
      token: sessionStorage.getItem('TOKEN'),
    },
    dashboard: {
      loading: false,
      data: {}
    },
    currentSurvey: {
      loading: false,
      survey: {} as Survey,
    },
    links: [],
    surveys: [],
    notifications: [],
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
    getDashboardData({ commit }) {
      commit('dashboardLoading', true);
      return axiosClient.get('/dashboard/index').then((res) => {
        commit('setDashboardData', res.data);
        commit('dashboardLoading', false);
        return res;
      });
    },
    getSurveys({ commit }, {url = null} = {}) {
      url = url || `/survey`;
      return axiosClient.get(url).then((res) => {
        commit('setSurveys', res.data);
        return res;
      }).catch((err) => {
        throw err;
      })
    },
    getSurvey({ commit }, id) {
      commit('setCurrentSurveyLoading', true);
      return axiosClient.get(`/survey/${id}`).then((res) => {
        commit('setCurrentSurvey', res.data.data as Survey[]);
        commit('setCurrentSurveyLoading', false);
        return res;
      }).catch((err) => {
        commit('setCurrentSurveyLoading', false);
        throw err;
      })
    },
    getSurveyBySlug({ commit }, slug: string) {
      commit('setCurrentSurveyLoading', true);
      return axiosClient.get(`/survey-by-slug/${slug}`).then((res) => {
        commit('setCurrentSurvey', res.data.data as Survey[]);
        commit('setCurrentSurveyLoading', false);
        return res;
      }).catch((err) => {
        commit('setCurrentSurveyLoading', false);
        throw err;
      })
    },
    async saveSurvey({ commit }, survey) {
      let response; 
      if(survey.id) {
        response = await axiosClient
        .put(`/survey/${survey.id}`, survey)
        .then((res) => {
          commit('setCurrentSurvey', res.data.data);
          return res;
        });
      } else {   
        response = axiosClient.post('/survey', survey).then((res) => {
          commit('setCurrentSurvey', res.data.data);
          return res;
        });
      }
      return response;
    },
    deleteSurvey({}, id: number) {
      return axiosClient.delete(`/survey/${id}`);
    },
    saveSurveyAnswer: ({ commit }, { surveyId, answers }) => {
      return axiosClient.post(`/survey/${surveyId}/answer`, { answers })
    },
  },
  mutations: {
    signout: (state: State) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN');
    },
    setUser: (state: State, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      if(!userData.token) return;
      
      sessionStorage.setItem('TOKEN', userData.token);
    },
    dashboardLoading: (state: State, loading: boolean) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state: State, data: any) => {
      state.dashboard.data = data;
    },
    notify: (state: State, notification: Notification) => {
      const index = state.notifications.length
      state.notifications.push(notification);
      setTimeout(() => state.notifications[index].show = false, 3000);
    },
    setSurveys: (state: State, surveys: any) => {
      state.surveys = surveys.data;
      state.links = surveys.meta.links;
    },
    setCurrentSurveyLoading: (state: State, loading: boolean) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state: State, survey: Survey) => {
      state.currentSurvey.survey = survey;
    },
    saveSurvey: (state: State, newSurvey: Survey) => {
      state.surveys = [...state.surveys, newSurvey];
    },
    updateSurvey: (state: State, newSurvey: Survey) => {
      let newSurveys = state.surveys.filter((survey) => {
        return survey.id === newSurvey.id;
      });

      newSurveys.push(newSurvey);
      state.surveys = newSurveys; 
    }
  },
  modules: {}

});

export default store;
