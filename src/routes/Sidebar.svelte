<script lang="ts">
  import { getAppSettings, PLAN } from '$lib/utils/settings';
  import AiIcon from '$lib/images/ai.svg?raw';
  import ArrowRightcon from '$lib/images/arrow-right.svg?raw';
  import ArrowDownIcon from '$lib/images/arrow-down.svg?raw';
  import type { TemplateId, Templates } from '$lib/types/template';
  import { Circle3 } from 'svelte-loading-spinners';

  export let text = '';
  export let questions = 0;
  export let options = 0;
  export let handleSubmit = (e = {}) => {};
  export let templateId: TemplateId;
  export let templates: Array<Templates>;
  export let handleTemplateChange = () => {};
  export let isLoading = false;
  export let hideOnMobile = false;
  export let continueTyping = false;
  export let showContinueTyping = false;

  const SETTINGS = getAppSettings(PLAN.FREE);
  const QUESTIONS_LIMIT = SETTINGS.QUESTION_LIMIT;
  const TEXT_LIMIT = SETTINGS.TEXT_LIMIT;
  const OPTIONS_LIMIT = SETTINGS.OPTIONS_LIMIT;

  let showExamples = false;

  $: text = text.length > TEXT_LIMIT ? text.slice(0, TEXT_LIMIT) : text;
  $: questions = questions > QUESTIONS_LIMIT ? QUESTIONS_LIMIT : questions;
  $: options = options > OPTIONS_LIMIT ? OPTIONS_LIMIT : options;
</script>

<form class="{hideOnMobile && 'hidden'} md:block" on:submit={handleSubmit}>
  <section
    class="{hideOnMobile &&
      'rounded-lg bg-white border-4 border-gray-200 p-5'} h-full"
  >
    <div class="mb-6">
      <h1 class="mb-3 font-sans font-extrabold text-4xl">
        Create engaging quizzes in seconds
      </h1>
      <p class="font-light">
        Place any text and it will generate questions and options with the
        correct answer
      </p>
    </div>
    <!-- <div class="mb-5">
      <label>
        <span class="font-sans font-bold">Examples</span>
        :
        <select
          class="border border-gray-200 p-2"
          bind:value={templateId}
          on:change={handleTemplateChange}
        >
          {#each templates as template}
            <option value={template.id}>
              {template.text}
            </option>
          {/each}
        </select>
      </label>
    </div> -->

    <!-- Questions -->
    <label class="block w-full mb-5">
      <span class="block text-sm font-medium text-slate-700 mb-2"
        >How many questions do you want to create?</span
      >
      <input
        bind:value={questions}
        class="w-full rounded-lg bg-gray-100 py-2 px-7"
        type="number"
        min="2"
        max={QUESTIONS_LIMIT}
      />
      <p class="ml-1 text-sm text-slate-500">Max of {QUESTIONS_LIMIT}</p>
    </label>

    <!-- Options -->
    <label class="block w-full mb-5">
      <span class="block text-sm font-medium text-slate-700 mb-2"
        >How many options per questions do you want?</span
      >
      <input
        bind:value={options}
        class="rounded-lg w-full bg-gray-100 py-2 px-7"
        type="number"
        min="2"
        max={OPTIONS_LIMIT}
      />
      <p class="ml-1 text-sm text-slate-500">Max of {OPTIONS_LIMIT}</p>
    </label>

    <!-- Source text -->
    <div class="mb-4">
      <p class="mb-2 text-sm font-medium text-slate-700">
        What text do you want to generate questions from?
      </p>
      <div class="mb-3">
        <button
          class="px-2 rounded-full bg-gray-200 w-fit text-sm flex items-center"
          on:click={() => (showExamples = !showExamples)}
          type="button"
        >
          <span class="mr-3">See Examples</span>
          {#if showExamples}
            {@html ArrowDownIcon}
          {:else}
            {@html ArrowRightcon}
          {/if}
        </button>
        {#if showExamples}
          <div class="flex mt-2 w-full justify-start flex-wrap">
            {#each templates as template}
              <button
                class="{templateId === template.id &&
                  'bg-gray-200'} px-2 py-3 mr-2 rounded-lg w-fit mb-2 border border-gray-200 hover:bg-gray-200 text-sm flex items-center"
                on:click={() => {
                  templateId = template.id;
                  handleTemplateChange();
                }}
                type="button"
              >
                {template.text}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <textarea
        bind:value={text}
        id="sidebar-text"
        class="w-full rounded-lg border-2 bg-gray-100 p-2 overflow-scroll"
        placeholder="Paste your text here"
      />
      <p class="text-slate-500 text-xs text-right">
        {text.length} / {TEXT_LIMIT}
      </p>
    </div>

    <!-- Generate button -->
    <div class="w-full flex justify-center">
      <button
        id="generate-form"
        class="{isLoading
          ? 'bg-white border-2 border-gray-300'
          : 'bg-yellow-500'} px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-white flex items-center hover:shadow-2xl transition-shadow ease-in delay-100"
        disabled={isLoading}
        type="submit"
      >
        {#if isLoading}
          <Circle3 size="30" duration="1s" />
        {:else}
          {@html AiIcon}
          <span class="ml-1">Generate</span>
        {/if}
      </button>

      <button
        id="generate-form"
        class="bg-white border-2 border-gray-300 px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-black flex items-center hover:shadow-2xl transition-shadow ease-in delay-100"
        on:click={() => {
          continueTyping = true;
          console.log('Click on continue typing');
        }}
        type="submit"
      >
        {showContinueTyping ? '+' : '-'}
        <span class="ml-1">Continue typing</span>
      </button>
    </div>
  </section>
</form>

<style>
  form section {
    width: 100%;
    max-height: 70vh;
    height: 70vh;
  }
  #sidebar-text {
    height: 30vh;
    max-height: 30vh;
  }
  @media only screen and (min-width: 768px) {
    form section {
      max-width: 380px;
      width: 380px;
      max-height: 83vh;
      height: 83vh;
      overflow-y: auto;
    }
    #sidebar-text {
      height: 195px;
      max-height: 195px;
    }
  }
</style>
