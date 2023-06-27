import type { ChatCompletionRequestMessage } from 'openai-edge';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import { getQuizPrompt } from '$lib/utils/ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const messages: ChatCompletionRequestMessage[] = [];

export async function POST({ request }) {
  const { prompt, questions, options, customPrompt, continueTyping } =
    await request.json();

  if (continueTyping) {
    messages.push({
      role: 'user',
      content: 'Continue typing',
    });
  } else if (customPrompt) {
    messages.push({
      role: 'user',
      content: customPrompt,
    });
  } else {
    messages.push({
      role: 'user',
      content: getQuizPrompt(questions, options, prompt),
    });
  }
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages,
    stream: true,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
