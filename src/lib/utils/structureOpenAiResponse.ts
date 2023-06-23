import type { QData, Params } from '../types/questions';

export const structureOpenAiResponse = (params: Params) => {
  let questions: Array<QData> = [];
  let summary = '';
  const textLines = params.text.split('\n');

  textLines.forEach((line: string) => {
    const isSummary = /^Summary:/.test(line.trim());
    const isQuestion = /^\d/.test(line.trim());
    const isOption = /^\w[\)\.]/.test(line.trim());

    if (isSummary) {
      summary = line.replace('Summary:', '');
    } else if (isQuestion) {
      const title = line.trim();
      const qIndex = parseInt(title[0]);
      const isUpdate = !!questions[qIndex - 1];

      if (isUpdate) {
        questions = questions.map((q, i) => {
          if (questions.length - 1 === i) {
            q.title = title;
            q.options = [];
          }
          return q;
        });
      } else {
        questions.push({
          title,
          options: [],
          answer: '',
        });
      }
    } else if (isOption) {
      const newOption = line.trim();
      const lastQuestion = questions[questions.length - 1];

      const isUpdate = lastQuestion.options.findIndex((option) => {
        return newOption.includes(option);
      });
      questions = questions.map((q, i) => {
        if (questions.length - 1 === i) {
          if (isUpdate !== -1) {
            q.options = q.options.map((option, i) => {
              return i === isUpdate ? newOption : option;
            });
          } else {
            q.options.push(line.trim());
          }
        }
        return q;
      });
    } else if (line) {
      questions = questions.map((q, i) => {
        if (questions.length - 1 === i) {
          q.answer = line.trim();
        }
        return q;
      });
    }
  });

  return { data: questions, raw: textLines, summary };
};

// const splitOptions = (question: string, optionsTotal: number) => {
//   // Option Keys
//   const optionKeys = ['A', 'B', 'C', 'D', 'E'];

//   // Output: (A\)*)(B\)*)(C\)*)(D\)*)(E\)*)/g;
//   const opRegexStr = Array.from({ length: optionsTotal }, (v, i) => i).reduce(
//     (acc, curr) => acc + `(${optionKeys[curr]}\\).*)`,
//     ''
//   );
//   const opRegexp = new RegExp(opRegexStr, 'gi');

//   const [options] = Array.from(question.matchAll(opRegexp), (match, i) => {
//     const options: Array<string> = [];
//     match.forEach((string, i) => {
//       if (!i) return;
//       options.push(string);
//     });
//     return options;
//   });

//   return options;
// };

// const formatTitle = (question: string) => {
//   const title = question.split('?')?.[0] || '';
//   return title.replace(/\d\.\s/g, '');
// };

// const formatAnswer = (question: string) => {
//   const answer = question.match(/Answer: .*/)?.[0] || '';
//   return answer.replace(/Answer:\s/g, '');
// };

// const formatQuestions = (rawQuestions: Array<string>, params: Params) => {
//   const questions = rawQuestions.map((rawQuestion) => {
//     const title = formatTitle(rawQuestion);
//     const options = splitOptions(rawQuestion, params.options);
//     const answer = formatAnswer(rawQuestion);
//     return { title, options, answer };
//   });
//   return questions;
// };

// const generateRawQuestions = (arrayOfStrs: Array<string>, params: Params) => {
//   const questions: Array<string> = [];
//   arrayOfStrs.forEach((string, i) => {
//     if (!i) return;
//     questions.push(string);
//   });
//   return formatQuestions(questions, params);
// };

// const generateQuestions = (text) => {
//   const arrayText = text.
// }
