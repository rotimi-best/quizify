<script lang="ts">
  import { onMount } from 'svelte';
  import AiEditorIcon from '$lib/images/ai-editor.svg?raw';
  import CodeMirror from 'svelte-codemirror-editor';
  import { javascript } from '@codemirror/lang-javascript';
  import { useCompletion } from 'ai/svelte';
  import { structureOpenAiResponse } from '$lib/utils/structureOpenAiResponse';
  import { mockData } from '$lib/utils/mock';
  import GoogleForm from './GoogleForm.svelte';
  import Sidebar from './Sidebar.svelte';
  import Tabs from './Tabs.svelte';
  import TabContent from './TabContent.svelte';
  import Modal from './Modal.svelte';
  import { form } from '$lib/stores/forms';
  import { initTour } from '$lib/utils/appTour';
  import { TemplateId, type Templates } from '$lib/types/template';
  import type { QData } from '$lib/types/questions';

  let body = {
    questions: 5,
    options: 3,
  };
  let sheetData: { title: string; questions: Array<QData> } = {
    title: '',
    questions: [],
  };
  let rawText: Array<string> = [];
  let textarea: HTMLElement;
  let rawDiv: HTMLElement;

  let openAiEditor = false;

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

  let templates: Array<Templates> = [
    { id: TemplateId.oop, text: 'About OOP' },
    { id: TemplateId.elonMusk, text: 'Knowledge of Elon Musk' },
    { id: TemplateId.spaceFlight, text: 'About Spaceflight' },
    { id: TemplateId.election, text: 'Nigerian 2023 Election' },
    { id: TemplateId.chatGPT, text: 'ChatGPT - AI chat bot' },
  ];
  let templateId: TemplateId = templates[0].id || TemplateId.oop;
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

  const isTitle = (line: string) => /^Summary:/.test(line.trim());
  const isQuestion = (line: string) => /^\d/.test(line.trim());
  const onChange =
    (tab = '') =>
    () =>
      (currentTab = tab);

  onMount(() => {
    initTour();
  });

  $: {
    const { data, raw, summary } = structureOpenAiResponse({
      ...body,
      text: $completion,
    });

    sheetData.questions = data;
    rawText = raw;
    sheetData.title = summary;
    if (textarea) {
      textarea.scrollTop = textarea.scrollHeight;
    }
    if (rawDiv) {
      rawDiv.scrollTop = rawDiv.scrollHeight;
    }
  }
</script>

<Modal
  onClose={() => (openAiEditor = false)}
  bind:open={openAiEditor}
  width="w-96"
  modalHeading="Delete question"
>
  <Sidebar
    {templates}
    bind:templateId
    handleTemplateChange={() => {
      $input = mockData[templateId];
    }}
    handleSubmit={(e) => {
      if ($isLoading) return;
      sheetData.questions = [];
      setTimeout(() => {
        handleSubmit(e);
        openAiEditor = false;
      }, 500);
    }}
    bind:questions={body.questions}
    bind:options={body.options}
    bind:text={$input}
    isLoading={$isLoading}
  />
</Modal>

<main class="w-full mt-4 md:mt-10">
  <div class="w-full md:w-4/5 md:m-auto md:flex md:justify-center">
    <Sidebar
      {templates}
      bind:templateId
      handleTemplateChange={() => {
        $input = mockData[templateId];
      }}
      handleSubmit={(e) => {
        if ($isLoading) return;
        sheetData.questions = [];
        setTimeout(() => {
          handleSubmit(e);
        }, 500);
      }}
      bind:questions={body.questions}
      bind:options={body.options}
      bind:text={$input}
      isLoading={$isLoading}
      hideOnMobile={true}
    />
    <div class="mx-2 md:w-3/5 md:ml-5">
      <Tabs {currentTab} {tabs} {onChange}>
        <div slot="button">
          <GoogleForm title={sheetData.title} questions={sheetData.questions} />
        </div>
        <TabContent value={tabs[0].value} index={currentTab}>
          <div
            bind:this={rawDiv}
            class="container w-full rounded-lg bg-white p-5 shadow-lg"
          >
            {#each rawText as text}
              {#if isTitle(text)}
                <h3 class="mt-4 text-lg font-semibold">{sheetData.title}</h3>
              {:else if isQuestion(text)}
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
          <CodeMirror
            value={JSON.stringify(sheetData, null, 2)}
            lang={javascript()}
            class="codemirror w-full px-5"
            editable={false}
          />
        </TabContent>
        <TabContent value={tabs[2].value} index={currentTab}>
          <div class="container w-full rounded-lg bg-white p-5 shadow-lg">
            {#if $form.info.title}
              Hurray, open your <a
                href="https://docs.google.com/forms/d/{$form.formId}"
                target="_
                "
                class="underline text-yellow-600">form</a
              >
            {:else}
              No form generated
            {/if}
          </div>
        </TabContent>
      </Tabs>
    </div>
  </div>
</main>

<div class="absolute right-5 bottom-5 md:hidden">
  <button
    class="bg-yellow-500 hover:bg-yellow-700 px-5 py-3 text-sm leading-5 rounded-lg font-semibold text-white flex items-center"
    on:click={() => (openAiEditor = !openAiEditor)}
  >
    {@html AiEditorIcon}
    <span class="ml-1">Open AI Editor</span>
  </button>
</div>

<style>
  .container,
  :global(.codemirror-wrapper) {
    max-height: 70vh;
    height: 70vh;
    overflow-y: scroll;
  }
</style>
