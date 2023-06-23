import type { QData, Request } from '../types/questions';

export const getPostBodyFromQuestion = (questions: Array<QData>) => {
  const body: { requests: Array<Request>; includeFormInResponse: boolean } = {
    requests: [],
    includeFormInResponse: false,
  };

  let index = 0;
  for (const question of questions) {
    const request: Request = {
      createItem: {
        item: {
          title: question.title,
          questionItem: {
            question: {
              choiceQuestion: {
                options: question.options.map((o) => ({ value: o })),
                type: 'RADIO',
              },
            },
          },
        },
        location: {
          index,
        },
      },
    };

    body.requests.push(request);

    index++;
  }

  return body;
};
