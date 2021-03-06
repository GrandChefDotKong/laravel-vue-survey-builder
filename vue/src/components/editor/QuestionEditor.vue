<script setup lang="ts">
import { ref } from 'vue';
import { QuestionType, Question, Option } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { computed } from '@vue/reactivity';

  const props = defineProps<{
    question: Question,
    index: number,
  }>();

  const emit = defineEmits<{
    (e: 'change', data: Question): Question
    (e: 'addQuestion'): void
    (e: 'deleteQuestion'): void
  }>()
  

  const model = ref<Question>({
    id: props.question.id,
    type: props.question.type,
    options: props.question.options,
    question: props.question.question,
    description: props.question.description,
  });

  const shouldHaveOptions = () => {
    return ['select', 'radio', 'checkbox'].includes(model.value.type);
  }

  const getOptions = () => {
    return model.value.options;
  }

  const setOptions = (options: any) => {
    if(model.value.type === 'checkbox' && model.value.options 
    && model.value.options.length > 1) {
      model.value.options.splice(1);
    }

    model.value.options = options;
  }

  const addOption = () => {
    if(!model.value.options){
      setOptions([
        { uuid: uuidv4(), text: "", },
      ]);
    } else {
      setOptions([
        ...model.value.options,
        { uuid: uuidv4(), text: "", },
      ]);
    }

    dataChange();
  }

  const canAddOption = computed(() => {
    if(!['select', 'radio', 'checkbox'].includes(model.value.type)) {
      return false;
    }

    return true;
  })

  const removeOption = (option: Option) => {
    setOptions(getOptions()?.filter((opt) => opt.uuid !== option.uuid));
    dataChange();
  }

  const typeChange = () => {
    if (shouldHaveOptions()) {
      setOptions(getOptions());
    }

    dataChange();
  }

  const dataChange = () => {
    const data = model.value;
    if (!shouldHaveOptions()) {
      model.value.options = null;
    }
    console.log('changed')
    emit("change", data);
  }

  const addQuestion = () => {
    if(!props.index) return;
    emit("addQuestion");
  }

  const deleteQuestion = () => {
    emit("deleteQuestion");
  }
</script>

<template>
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">
      {{ index + 1 }}. {{ model.question }}
    </h3>
    <div class="flex items-center">
      <button type="button" @click="addQuestion()" 
        class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm 
      text-white bg-gray-600 hover:bg-gray-700" vur
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 
            1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button
        type="button"
        @click="deleteQuestion()"
        class="flex items-center text-xs py-1 px-3 rounded-sm border 
          border-transparent text-red-500 hover:border-red-600"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
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
        Delete
      </button>
    </div>
  </div>
  <div class="grid gap-3 grid-cols-12">
    <div class="mt-3 col-span-9">
      <label :for="'question_text_' + model.question"
        class="block text-sm w-fit font-medium text-gray-700"
      >
        Question Text :
      </label>
      <input
        type="text"
        :name="'question_text_' + model.question"
        v-model="model.question"
        @change="dataChange"
        :id="'question_text_' + model.question"
        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500
        block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
    <div class="mt-3 col-span-3">
      <label for="question_type" 
        class="block text-sm w-fit font-medium text-gray-700"
      >
        Select Question Type :
      </label>
      <select
        id="question_type"
        name="question_type"
        v-model="model.type"
        @change="typeChange"
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white
          rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
          focus:border-indigo-500 sm:text-sm"
      >
        <option v-for="type in QuestionType" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
  </div>
  <div class="mt-3 col-span-9" >
    <label :for="'question_description_' + model.id"
    class="block text-sm w-fit font-medium text-gray-700">
      Description :
    </label>
    <textarea
      :name="'question_description_' + model.id"
      v-model="model.description"
      @change="dataChange"
      :id="'question_description_' + model.id"
      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    >
    </textarea>
  </div>
  <div>
    <div v-if="shouldHaveOptions()" class="mt-2">
      <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
        Options
        <button v-if="canAddOption" type="button" @click="addOption()"
          class="flex items-center text-xs py-1 px-2 rounded-sm text-white
          bg-gray-600 hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 
              1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Add Option
        </button>
      </h4>
      <div
        v-if="model.options && !model.options.length"
        class="text-xs text-gray-600 text-center py-3"
      >
        You don't have any options defined
      </div>
      <div
        v-for="(option, index) in model.options"
        :key="option.uuid"
        class="flex items-center mb-1"
      >
        <span class="w-6 text-sm"> {{ index + 1 }}. </span>
        <input
          type="text"
          tabindex="1"
          v-model="option.text"
          @change="dataChange"
          class="w-full rounded-sm py-1 px-2 text-xs border 
          border-gray-300 focus:border-indigo-500"
        />
        <button
          type="button"
          @click="removeOption(option)"
          class="h-6 w-6 rounded-full flex items-center justify-center border 
            border-transparent transition-colors hover:border-red-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-red-500"
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
        </button>
      </div>
    </div>
  </div>
</template>