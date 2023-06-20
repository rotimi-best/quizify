<script lang="ts">
  import { useCompletion } from 'ai/svelte';
  import { structureOpenAiResponse } from '$lib/utils/structureOpenAiResponse';
  import type { QData } from '$lib/utils/structureOpenAiResponse';
  import { mockData } from '$lib/utils/mock';
  import Sidebar from './Sidebar.svelte';
  import Tabs from './Tabs.svelte';
  import TabContent from './TabContent.svelte';

  let body = {
    questions: 2,
    options: 3,
  };
  let questionsJson: Array<QData> = [];
  let rawText: Array<string> = [];
  let textarea: HTMLElement;
  let rawDiv: HTMLElement;

  let tabs = [
    {
      label: 'Text',
      value: 'text',
    },
    {
      label: 'JSON',
      value: 'json',
    },
    {
      label: 'Quiz',
      value: 'quiz',
    },
  ];
  let templates = [
    { id: 'oop', text: 'About OOP' },
    { id: 'elonMusk', text: 'Knowledge of Elon Musk' },
    { id: 'spaceFlight', text: 'About Spaceflight' },
    { id: 'election', text: 'Nigerian 2023 Election' },
    { id: 'chatGPT', text: 'ChatGPT - AI chat bot' },
  ];
  let templateId = templates[0].id || 'oop';

  let currentTab = tabs[0].value;

  const { input, handleSubmit, completion, isLoading } = useCompletion({
    initialInput: mockData[templateId],
    api: '/api/completion',
    body,
    onResponse: (res) => {
      if (res.status === 429) {
        alert('You are being rate limited. Please try again later.');
      }
      if (res.status === 401) {
        console.log(res);
      }
    },
  });

  const isQuestion = (line: string) => /^\d/.test(line.trim());
  const onChange =
    (tab = '') =>
    () =>
      (currentTab = tab);

  $: {
    const { data, raw } = structureOpenAiResponse({
      ...body,
      text: $completion,
    });

    questionsJson = data;
    rawText = raw;
    if (textarea) {
      textarea.scrollTop = textarea.scrollHeight;
    }
    if (rawDiv) {
      rawDiv.scrollTop = rawDiv.scrollHeight;
    }
  }
</script>

<main class="w-full mt-10">
  <div class="w-4/5 m-auto flex justify-center">
    <Sidebar
      {templates}
      bind:templateId
      handleTemplateChange={() => {
        $input = mockData[templateId];
      }}
      handleSubmit={(e) => {
        questionsJson = [];
        setTimeout(() => {
          handleSubmit(e);
        }, 500);
      }}
      bind:questions={body.questions}
      bind:options={body.options}
      bind:text={$input}
      isLoading={$isLoading}
    />
    <div class="w-3/5 ml-5">
      <Tabs {currentTab} {tabs} {onChange}>
        <TabContent value={tabs[0].value} index={currentTab}>
          <div
            bind:this={rawDiv}
            class="container w-full rounded-lg bg-white p-5 shadow-lg"
          >
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
        </TabContent>
        <TabContent value={tabs[1].value} index={currentTab}>
          <textarea
            bind:this={textarea}
            class="container bg-white w-full h-full p-5"
            disabled
          >
            {JSON.stringify(questionsJson, null, 2)}
          </textarea>
        </TabContent>
        <TabContent value={tabs[2].value} index={currentTab}>
          <!-- Rendered uestions here -->
        </TabContent>
      </Tabs>
    </div>
  </div>
</main>

<style>
  .container {
    max-height: 700px;
    height: 700px;
    overflow: scroll;
  }
</style>
