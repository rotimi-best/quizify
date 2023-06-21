<script lang="ts">
  import AiIcon from '$lib/images/ai.svg?raw';
  import type { TemplateId, Templates } from '$lib/types/template';

  export let text = '';
  export let questions = 2;
  export let options = 2;
  export let handleSubmit = (e = {}) => {};
  export let templateId: TemplateId;
  export let templates: Array<Templates>;
  export let handleTemplateChange = () => {};
  export let isLoading = false;
  export let hideOnMobile = false;

  $: text = text.length > 1500 ? text.slice(0, 1500) : text;
  $: questions = questions > 5 ? 5 : questions;
  $: options = options > 4 ? 4 : options;
</script>

<form class="{hideOnMobile && 'hidden'} md:block" on:submit={handleSubmit}>
  <section class="{hideOnMobile && 'rounded-lg bg-white shadow-lg p-5'} h-full">
    <div class="mb-5">
      <label>
        <strong>Templates</strong>:
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
    </div>
    <div class="mb-5">
      <h3 class="mb-2 font-bold">Text</h3>
      <textarea
        bind:value={text}
        id="sidebar-text"
        class="w-full rounded-lg bg-gray-100 p-2 overflow-scroll"
        placeholder="Paste a note"
      />
      <p class="text-sm text-right">
        <strong>Max Character</strong>: {text.length} / 1500
      </p>
    </div>

    <div class="flex justify-between w-full mb-5">
      <label class="block">
        <span class="block text-sm font-medium text-slate-700 mb-2"
          >Question count</span
        >
        <input
          bind:value={questions}
          class="rounded-lg bg-gray-100 py-2 px-7"
          type="number"
          min="2"
          max="5"
        />
        <p class="ml-1 text-sm">Max of 5</p>
      </label>
      <label class="block">
        <span class="block text-sm font-medium text-slate-700 mb-2"
          >Options count</span
        >
        <input
          bind:value={options}
          class="rounded-lg bg-gray-100 py-2 px-7"
          type="number"
          min="2"
          max="4"
        />
        <p class="ml-1 text-sm">Max of 4</p>
      </label>
    </div>
    <div class="w-full flex justify-center">
      <button
        class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white flex items-center"
        disabled={isLoading}
        type="submit"
      >
        {@html AiIcon}
        <span class="ml-1">Generate</span>
      </button>
    </div>
  </section>
</form>

<style>
  form {
    width: 100%;
    max-height: 70vh;
    height: 70vh;
  }
  #sidebar-text {
    height: 30vh;
    max-height: 30vh;
  }
  @media only screen and (min-width: 768px) {
    form {
      max-width: 380px;
      width: 380px;
      max-height: 780px;
      height: 780px;
    }
    #sidebar-text {
      height: 390px;
      max-height: 390px;
    }
  }
</style>
