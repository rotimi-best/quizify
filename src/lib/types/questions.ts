export interface Params {
  questions: number;
  options: number;
  text: string;
  explanation?: boolean;
  customPrompt?: string;
  studentPersona?: string;
}

export interface QData {
  title: string;
  options: Array<string>;
  answer: string;
  explanation?: string;
}

export interface Request {
  createItem: {
    item: {
      title: string;
      questionItem: {
        question: {
          choiceQuestion: {
            options: Array<{ value: string }>;
            type: string;
          };
        };
      };
    };
    location: {
      index: number;
    };
  };
}
