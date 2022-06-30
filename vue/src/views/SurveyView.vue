<script setup lang="ts">
import PageComponent from '../components/PageComponent.vue';
import QuestionEditor from '../components/editor/QuestionEditor.vue';
import TButton from '../components/core/TButton.vue';
import store from '../store';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { QuestionType, Question, Survey, NotificationType } from '../types/types';

  const route = useRoute();
  const router = useRouter();

  const model = ref<Survey | null>({
    id: '',
    title: '',
    status: false,
    slug: '',
    description: '',
    image: null,
    expire_date: null,
    questions: [],
  });

  if(route.params.id) {
    store.dispatch('getSurvey', route.params.id);
  }

  watch(() => store.state.currentSurvey.survey, (newValue, oldValue) => {
    model.value = newValue;
  });

  const surveyLoading = computed(() => store.state.currentSurvey.loading);

  const formatedDate = computed(() => {
    if(!model.value?.expire_date) return null;

    model.value.expire_date.toLocaleDateString(
      'en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }
    );
  });

  const saveSurvey = () => {
    store.dispatch('saveSurvey', model.value).then(({ data }) => {
      store.commit('notify', {
        show: true,
        type: NotificationType.SUCCESS,
        message: `${model.value?.title} has been ${route.params.id ? 
        'updated' : 'saved'} !`
      });
      router.push({ name: 'survey-view', params: { id: data.data.id }, });
    });
  }

  const deleteSurvey = () => {
    if(!confirm('Are you sure ? This can be undone !')) return;

    store.dispatch('deleteSurvey', model.value?.id).then(() => {
      store.commit('notify', {
        show: true,
        type: NotificationType.SUCCESS,
        message: `${model.value?.title} has been deleted !`
      });
      router.push({ name: 'surveys' })
    })
  }

  const addQuestion = () => {
    if(!model.value) return;
    model.value.questions.push({
      id: model.value.questions.length,
      type: QuestionType.TEXT,
      options: null,
      question: '',
      description: '',
    })
  }

  const questionChange = (data: Question) => {
    if(!model.value) return;
    const newQuestions = model.value.questions.map((question) => {
      if(question.id === data.id) {
        return data;
      }
      return question;
    })

    model.value.questions = newQuestions;
  }

  const deleteQuestion = (id: number) => {
    if(!model.value) return;

    const newQuestions = model.value.questions.filter((question) => {
      return question.id !== id
    });

    model.value.questions = newQuestions;
  }

  const onImageChoose = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if(!model.value) return;

      model.value.image = reader.result;
     // model.value.image_url = reader.result;
    }
    reader.readAsDataURL(file);
  }
</script>

<template>
  <page-component>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ route.params.id ? "Update a Survey" : "Create a Survey" }}
        </h1>
        <button v-if="route.params.id" @click="deleteSurvey" type="button" 
        class="py-2 px-3 flex flex-row items-center text-white bg-red-500 rounded-md hover:bg-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 
              2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 
              2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 
              1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          Delete Survey
        </button>
      </div>
    </template>
    <div v-if="surveyLoading">Loading ...</div>
    <form v-if="model && !surveyLoading" @submit.prevent="saveSurvey"
      class="animate-fade-in-down"
    >
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <label class="block w-fit text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img v-if="model?.image" :src="model.image.toString()" :alt="model.title" 
                class="w-64 h-48 object-cover"
              />
              <span v-else class="flex items-center justify-center h-12 w-12 
              rounded-full overflow-hidden bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" 
                  class="h-[80%] w-[80%] text-gray-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 
                    2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 
                    00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <button type="button" class="relative overflow-hidden ml-5 bg-white
                py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4
                font-medium hover:text-white hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 
              focus:ring-indigo-500"
              >
                <input type="file" @change="onImageChoose" class="absolute left-0 top-0 right-0 bottom-0
                  opacity-0 cursor-pointer"
                >
                Change
              </button>
            </div>
          </div>
          <div>
            <label for="title" class="block w-fit text-sm font-medium text-gray-700">
              Title
            </label>
            <input type="text" name="title" id="title" v-model="model.title"
              autocomplete="survey_title" class="mt-1 focus:ring-indigo-500 
              focus:border-indigo-500 block w-full shadow-sm sm:text-sm 
              border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="description" class="block w-fit text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <textarea name="description" id="dscription" rows="3"
                v-model="model.description" autocomplete="survey_description"
                placeholder="describe your survey" class="mt-1 focus:ring-indigo-500 
              focus:border-indigo-500 block w-full shadow-sm sm:text-sm 
              border-gray-300 rounded-md"
              >
              </textarea>
            </div>
            <div>
              <label for="expire_date" class="block w-fit text-sm font-medium text-gray-700">
                Expire Date
              </label>
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                v-model="model.expire_date"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full 
                shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div class="flex items-start mt-4">
              <div class="flex items-center h-5">
                <input
                  id="status"
                  name="status"
                  type="checkbox"
                  v-model="model.status"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 
                  rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="status" class="font-medium text-gray-700">
                  Active
                </label>
              </div>
            </div>
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <h3 class="text-2xl font-semibold flex items-center justify-between">
                Questions
                <button
                  type="button"
                  @click="addQuestion()"
                  class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Add Question
                </button>
                <!--/ Add new question -->
              </h3>
              <div v-if="!model.questions || !model.questions.length" class="text-center text-gray-600">
                You don't have any questions created
              </div>
              <div v-for="(question, index) in model.questions" :key="question.id">
                <QuestionEditor
                  :question="question"
                  :index="index"
                  @change="questionChange"
                  @addQuestion="addQuestion"
                  @deleteQuestion="() => deleteQuestion(question.id)"
                />
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 flex justify-end text-right sm:px-6">
              <TButton>
                Save
              </TButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  </page-component>
</template>











