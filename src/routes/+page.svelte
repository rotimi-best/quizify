<script lang="ts">
  import { onMount } from 'svelte';
  import { toast } from '@zerodevx/svelte-toast';
  import copy from 'copy-html-to-clipboard';
  // import generateId from 'generate-unique-id';
  import AiEditorIcon from '$lib/images/ai-editor.svg?raw';
  import TadaIcon from '$lib/images/tada.png';
  import QuizIcon from '$lib/images/quiz.svg?raw';
  import CopyIcon from '$lib/images/copy.svg?raw';
  import CodeMirror from 'svelte-codemirror-editor';
  import { javascript } from '@codemirror/lang-javascript';
  import { useChat } from 'ai/svelte';
  import { structureOpenAiResponse } from '$lib/utils/structureOpenAiResponse';
  import { mockData } from '$lib/utils/mock';
  import Confetti from './Confetti.svelte';
  import GoogleForm from './GoogleForm.svelte';
  import Sidebar from './Sidebar.svelte';
  import Tabs from './Tabs.svelte';
  import TabContent from './TabContent.svelte';
  import Modal from './Modal.svelte';
  import { form } from '$lib/stores/forms';
  import { toggleConfetti } from '$lib/stores/confetti';
  import { initTour } from '$lib/utils/appTour';
  import { TemplateId, type Templates } from '$lib/types/template';
  import { getQuizPrompt } from '$lib/utils/ai';
  import type { QData } from '$lib/types/questions';
  import type { ChatCompletionRequestMessage } from 'openai-edge';

  let body: {
    questions: number;
    options: number;
    continueTyping: boolean;
    messages: ChatCompletionRequestMessage[];
    customPrompt: string;
  } = {
    questions: 5,
    options: 3,
    continueTyping: false,
    messages: [],
    customPrompt: '',
  };
  let sheetData: { title: string; questions: Array<QData> } = {
    title: '',
    questions: [],
  };
  let rawText: Array<string> = [];
  let textarea: HTMLElement;
  let rawDiv: HTMLElement;

  let openAiEditor = false;
  let showContinueTyping = false;
  let generateNew = false;

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
    { id: TemplateId.spaceFlight, text: 'About Spaceflight' },
    { id: TemplateId.oop, text: 'On OOP' },
    { id: TemplateId.elonMusk, text: 'Elon Musk' },
    { id: TemplateId.election, text: 'Nigerian 2023 Election' },
    { id: TemplateId.chatGPT, text: 'ChatGPT - AI chat bot' },
  ];
  let templateId: TemplateId = templates[0].id || TemplateId.oop;
  let currentTab = tabs[0].value;
  let text = mockData[templateId];

  const { input, handleSubmit, messages, isLoading } = useChat({
    initialInput: mockData[templateId],
    api: '/api/chat',
    onResponse: (res) => {
      console.log('useChat res', res);
      if (res.status === 429 || res.status === 500) {
        toast.push('Please wait and try again later.', {
          classes: ['failed'],
        });
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

  const getLatestAssistantMsg = (messages: ChatCompletionRequestMessage[]) => {
    const assistantMsgs = messages.filter(
      (message) => message.role === 'assistant'
    );

    if (body.continueTyping) {
      const lastMsgIndexWithSummary = assistantMsgs.findLastIndex((msg) =>
        isTitle(msg.content)
      );
      return assistantMsgs
        .slice(lastMsgIndexWithSummary)
        .map((msg) => msg.content)
        .join('');
    }

    return assistantMsgs[assistantMsgs.length - 1]?.content || '';
  };

  const customHandleSubmit = (e: {} | undefined) => {
    if ($isLoading) return;
    sheetData.questions = [];
    if (body.continueTyping) {
      generateNew = false;

      $input = 'Continue typing';
    } else {
      generateNew = true;
      $input = getQuizPrompt(body.questions, body.options, text);
    }
    setTimeout(() => {
      handleSubmit(e);
      openAiEditor = false;
    }, 500);
  };

  onMount(() => {
    initTour();
  });

  $: {
    const { data, raw, summary } = structureOpenAiResponse({
      ...body,
      text: getLatestAssistantMsg($messages) || '',
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

    showContinueTyping =
      !$isLoading &&
      data.length > 0 &&
      (data.length < body.questions ||
        (data[data.length - 1]?.options?.length || 0) < body.options);
  }
</script>

<Modal
  onClose={() => (openAiEditor = false)}
  bind:open={openAiEditor}
  width="w-96"
  modalHeading=""
>
  <Sidebar
    {templates}
    bind:templateId
    handleTemplateChange={() => {
      $input = mockData[templateId];
    }}
    handleSubmit={customHandleSubmit}
    bind:continueTyping={body.continueTyping}
    bind:questions={body.questions}
    bind:options={body.options}
    bind:text
    isLoading={$isLoading}
    {showContinueTyping}
  />
</Modal>
<Confetti />

<main class="w-full mt-4 md:mt-4">
  <div class="w-full md:w-4/5 md:m-auto md:flex md:justify-center">
    <!-- Left Sidebar -->
    <Sidebar
      {templates}
      bind:templateId
      handleTemplateChange={() => {
        text = mockData[templateId];
      }}
      handleSubmit={customHandleSubmit}
      bind:continueTyping={body.continueTyping}
      bind:questions={body.questions}
      bind:options={body.options}
      bind:text
      isLoading={$isLoading}
      hideOnMobile={true}
      {showContinueTyping}
    />

    <!-- Right Sidebar -->
    <div class="mx-2 md:w-3/5 md:ml-5">
      <!-- Tabs -->
      <Tabs {currentTab} {tabs} {onChange}>
        <!-- Google Button Logic -->
        <div slot="button">
          <GoogleForm
            title={sheetData.title}
            questions={sheetData.questions}
            onCompleteExport={() => {
              toggleConfetti();
              currentTab = tabs[2].value;
              setTimeout(toggleConfetti, 2500);
            }}
          />
        </div>

        <!-- Text Tab -->
        <TabContent value={tabs[0].value} index={currentTab}>
          <div class="relative">
            <div
              bind:this={rawDiv}
              class="container w-full rounded-lg bg-white p-5 shadow-lg relative"
            >
              {#if !rawText.length || !rawText[0].length}
                <p class="font-sans font-bold">Your Generated output:</p>
              {:else}
                {#each rawText as text}
                  {#if isTitle(text)}
                    <h3 class="mt-4 text-lg font-semibold">
                      {sheetData.title}
                    </h3>
                  {:else if isQuestion(text)}
                    <p class="font-sans mt-4">{text}</p>
                  {:else}
                    <p class="font-sans ml-3 mb-2">{text}</p>
                  {/if}
                {/each}
              {/if}
            </div>

            {#if !$isLoading}
              <!-- Copy Button -->
              <button
                class="absolute top-2 right-1 p-2 rounded-lg border border-gray-200 hover:bg-gray-200 hover:shadow-2xl transition-shadow ease-in delay-100 flex items-center"
                type="button"
                on:click={() => {
                  copy(rawDiv.innerHTML, {
                    asHtml: true,
                  });
                  toast.push('Copied');
                }}
              >
                {@html CopyIcon}
                <span>Copy</span>
              </button>
            {/if}
          </div>
        </TabContent>

        <!-- JSON Tab -->
        <TabContent value={tabs[1].value} index={currentTab}>
          <div class="relative">
            <CodeMirror
              value={JSON.stringify(sheetData, null, 2)}
              lang={javascript()}
              class="codemirror w-full px-5"
              editable={false}
            />

            <!-- Copy Button -->
            <button
              class="absolute top-2 right-1 p-2 rounded-lg border border-gray-200 hover:bg-gray-200 hover:shadow-2xl transition-shadow ease-in delay-100 flex items-center"
              type="button"
              on:click={() => {
                copy(JSON.stringify(sheetData, null, 2), {
                  asHtml: true,
                });
                toast.push('Copied');
              }}
            >
              {@html CopyIcon}
              <span>Copy</span>
            </button>
          </div>
        </TabContent>

        <!-- Quizes Tab -->
        <TabContent value={tabs[2].value} index={currentTab}>
          <div class="container w-full rounded-lg bg-white p-5 shadow-lg">
            {#if $form.info.title && $form.formId}
              <div class="w-2/3 m-auto flex flex-col items-center mt-10">
                <img src={TadaIcon} alt="tada icon" width="120" height="120" />
                <p class="font-sans text-4xl my-3">Hurray your Quiz is Live</p>
                <a
                  href="https://docs.google.com/forms/d/{$form.formId}"
                  target="_
                "
                  class="border-4 border-yellow-400 px-5 py-2 text-sm leading-5 rounded-lg font-semibold"
                  >Open Google Form</a
                >
              </div>
            {:else}
              <div class="w-2/3 m-auto flex flex-col items-center mt-10">
                {@html QuizIcon}
                <p class="font-sans text-4xl my-3">No quiz published</p>
                <p class="font-sans w-60">
                  Hit the <strong>Generate</strong> button on the left to generate
                  your first quiz
                </p>
              </div>
            {/if}
          </div>
        </TabContent>
      </Tabs>
    </div>
  </div>
</main>

<!-- Mobile Button -->
<div class="absolute right-5 bottom-5 md:hidden">
  <button
    class="bg-yellow-500 hover:bg-yellow-700 px-5 py-3 text-sm leading-5 rounded-lg font-semibold flex items-center hover:shadow-2xl transition-shadow ease-in delay-100"
    on:click={() => (openAiEditor = !openAiEditor)}
  >
    {@html AiEditorIcon}
    <span class="ml-1">Open AI Editor</span>
  </button>
</div>

<style>
  .container,
  :global(.codemirror-wrapper) {
    max-height: 73vh;
    height: 73vh;
    overflow-y: scroll;
  }
</style>
