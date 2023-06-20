const params = {
  questions: 5,
  options: 4,
  text: `1. What are the two main concepts that object-oriented programming languages that use classes support? 
  a) Procedures and variables 
  b) Classes and methods 
  c) Objects and instances 
  d) Data and functions
  (answer: b)
  
  2. What is the purpose of encapsulation in object-oriented programming? 
  a) To hide data from semantically related functions 
  b) To allow external code to access internal workings of an object `,
};

const generateQuestions = (params) => {
  const questions = [];
  const textLines = params.text.split('\n');

  const qRegexStr = Array.from(
    { length: params.questions },
    (v, i) => i + 1
  ).reduce((acc, curr, i) => acc + `(${curr}.*)`, '');
  const qRegexp = new RegExp(qRegexStr, 'g');

  const qData = {
    title: '',
    options: [],
    answer: '',
  };
  textLines.forEach((_line) => {
    const line = _line.trim();
    const isQuestion = line.match(qRegexp) !== null;
    const isOption = /^\w\)/.test(line);

    if (isQuestion) {
      qData.title = line.replace(/\d\.\s/g, '');
    }

    if (isOption) {
      qData.options.push(line);
    }

    if (!isQuestion && !isOption && line) {
      qData.answer = line;
    }

    if (!line) {
      questions.push(qData);

      qData.title = '';
      qData.options = [];
      qData.answer = '';
    }
  });
};

// console.log(structureOpenAiResponse(params));
