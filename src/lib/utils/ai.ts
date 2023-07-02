import type { Params } from '../types/questions';

export const getQuizPrompt = (body: Params, prompt: string) => {
  return `
Write ${body.questions} multichoice questions with ${
    body.options
  } options from the text below${
    body.studentPersona
      ? ` to ask my student who is in ${body.studentPersona}`
      : ''
  }. IMPORTANT: Summarize the text in 10 words, ${
    body.explanation ? 'explain the correct answers, ' : ''
  }do not repeat answers in the same order and use this format template
  Summary: Summary of text
  1. First question
     A) Option 1
     B) Option 2
     and so on
  Answer:  \${A, B, C, D, or more}
  ${
    body.explanation
      ? 'Explanation: Explanation of ${CHOICE A, B, C, D, or more}'
      : ''
  }

  ${
    body.customPrompt
      ? `This instruction must overide every one given above: ${body.customPrompt}`
      : ''
  }
  Here is the text in tripple quotes:
"""${prompt}"""`;
};

export const getQuizPromptV2 = (
  questions: number,
  options: number,
  prompt: string
) => {
  return `Write a ${questions} multichoice questions with ${options} options from the text below.
  Important Instructions:
1. Summarize the text in 10 words. 
2. Do not repeat answers.
3. Use this format template. 

---BEGIN FORMAT TEMPLATE---
\${SUMMARY_IN_10_WORDS}

\${QUESTION}
A) \${ANSWER 1}
B) \${ANSWER 2}
C) \${ANSWER 3}
D) \${ANSWER 4}
Correct Answer: \${CHOICE A, B, C, or D}
---END FORMAT TEMPLATE---

Here is the text:
${prompt}.`;
};
