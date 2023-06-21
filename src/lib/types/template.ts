export enum TemplateId {
  oop,
  elonMusk,
  spaceFlight,
  election,
  chatGPT,
}

export interface Templates {
  id: TemplateId;
  text: string;
}

export type MockData = {
  [key in TemplateId]: string;
};
