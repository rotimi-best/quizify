<script lang="ts">
  import { useCompletion } from 'ai/svelte';
  import { structureOpenAiResponse } from '$lib/utils/structureOpenAiResponse';
  import type { QData } from '$lib/utils/structureOpenAiResponse';

  let body = {
    questions: 3,
    options: 4,
  };
  let questionsJson: Array<QData> = [];
  let rawText: Array<string> = [];
  let cardClass = 'bg-white shadow-xl p-8 text-slate-700 text-sm leading-6';
  let textarea: HTMLElement;
  let rawDiv: HTMLElement;

  const { input, handleSubmit, completion } = useCompletion({
    initialInput: `Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code. The data is in the form of fields (often known as attributes or properties), and the code is in the form of procedures (often known as methods).

A common feature of objects is that procedures (or methods) are attached to them and can access and modify the object's data fields. In this brand of OOP, there is usually a special name such as this or self used to refer to the current object. In OOP, computer programs are designed by making them out of objects that interact with one another.[1][2] OOP languages are diverse, but the most popular ones are class-based, meaning that objects are instances of classes, which also determine their types.

Many of the most widely used programming languages (such as C++, Java,[3] Python, etc.) are multi-paradigm and they support object-oriented programming to a greater or lesser degree, typically in combination with imperative, procedural programming.`,
    api: '/api/completion',
    body,
    onResponse: (res) => {
      if (res.status === 429) {
        alert('You are being rate limited. Please try again later.');
      }
    },
  });

  const isQuestion = (line: string) => /^\d/.test(line.trim());

  $: {
    const { data, raw } = structureOpenAiResponse({
      ...body,
      text: $completion,
    });

    questionsJson = data;
    rawText = raw;
    if (textarea) {
      textarea.scrollTop = textarea.scrollHeight;
      rawDiv.scrollTop = rawDiv.scrollHeight;
    }
  }
</script>

<main class="h-screen w-screen m-0 relative">
  <div class="flex h-5/6">
    <form
      on:submit={(e) => {
        questionsJson = [];
        setTimeout(() => {
          handleSubmit(e);
        }, 500);
      }}
      class="w-3/12 {cardClass}"
    >
      <textarea
        bind:value={$input}
        placeholder="Text to generate quiz from..."
        class="w-full h-5/6 border-2 border-gray-300 p-5"
      />
      <button
        class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
        type="submit">Generate Questions</button
      >
    </form>

    <div class="w-3/12 {cardClass}" bind:this={rawDiv}>
      <h2>Raw</h2>
      {#each rawText as text}
        {#if isQuestion(text)}
          <p class="mt-4">{text}</p>
        {:else}
          <p class="ml-3 mb-2">{text}</p>
        {/if}
      {:else}
        <p>{$completion}</p>
      {/each}
    </div>
    <div class="w-3/12 {cardClass}">
      <h2>JSON</h2>
      <textarea
        bind:this={textarea}
        class="bg-white w-full h-full p-5"
        disabled
      >
        {JSON.stringify(questionsJson, null, 2)}
      </textarea>
    </div>
  </div>
</main>
