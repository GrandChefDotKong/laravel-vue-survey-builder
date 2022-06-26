export enum QuestionType {
  TEXT = 'text', 
  SELECT = 'select', 
  RADIO = 'radio', 
  CHECKBOX = 'checkbox', 
  TEXTAREA = 'textarea'
}

export type Question = {
  id: number,
  type: QuestionType,
  question: string,
  description: string
}

export type Survey = {
  id: string,
  title: string,
  status: boolean,
  description: string,
  image: null | string,
  expire_date: null | Date,
  questions: Question[],
};
