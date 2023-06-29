export const getQuizPrompt = (
  questions: number,
  options: number,
  prompt: string
) => {
  return `
Write ${questions} multichoice questions with ${options} options from the text below. IMPORTANT: Summarize the text in 10 words, do not repeat answers and use this format template
  Summary: Summary of text
  1. First question
     A) Option 1
     B) Option 2
     C) Option 3
     D) Option 4
  Answer:  \${CHOICE A, B, C, or D}
  2. Next question
     A) An option
     B) Another option
     C) Extra option
     D) Plus option
  Answer:  \${CHOICE A, B, C, or D}
  
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
