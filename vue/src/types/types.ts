export enum QuestionType {
  TEXT = 'text', 
  SELECT = 'select', 
  RADIO = 'radio', 
  CHECKBOX = 'checkbox', 
  TEXTAREA = 'textarea'
}

export enum NotificationType {
  NULL = 'null', 
  SUCCESS = 'success', 
  FAIL = 'fail',
  ERROR = 'errror'
}

export type Notification = {
  show: boolean,
  type: string,
  message: string | null,
}

export type Option = {
  uuid: string,
  text: string,
}

export type Question = {
  id: number,
  type: QuestionType,
  options: Option[] | null,
  question: string,
  description: string
}

export type Survey = {
  id: string,
  slug: string,
  title: string,
  status: boolean,
  description: string,
  image: null | string | ArrayBuffer,
  expire_date: null | Date,
  questions: Question[],
};
