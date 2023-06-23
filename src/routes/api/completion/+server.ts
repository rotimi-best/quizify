import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST({ request }) {
  const { prompt, questions, options } = await request.json();

  const content = `
Given the following text, generate ${questions} questions to ask my students with ${options} options with 1 correct answer and ${
    options - 1
  } wrong answer also indicate the answer in a bracket. In addition come up with a 5 word sentence that summarises the text and call it summary. Use the following format

  Summary: Summary of text
  1. First question
     a) Option 1
     b) Option 2
  Answer: b)
  
  Here is the text:
${prompt}`;

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    stream: true,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
