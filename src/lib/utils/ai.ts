export const getQuizPrompt = (
  questions: number,
  options: number,
  prompt: string
) => {
  return `
Given the following text, generate ${questions} questions to ask my students with ${options} options with 1 correct answer and ${
    options - 1
  } wrong answer also indicate the answer in a bracket. Summarize this text in one sentence with a prefix that says "Summary: ". Mix the options so that answers don't have the same options in each question. For the order of question, use the following format

  Summary: Summary of text
  1. First question
     a) Option 1
     b) Option 2
     c) Option 3
     d) Option 4
  Answer: a)
  2. Next question
     a) An option
     b) Another option
     c) Extra option
     d) Plus option
  Answer: c)
  
  Here is the text in tripple quotes:
"""${prompt}"""`;
};
