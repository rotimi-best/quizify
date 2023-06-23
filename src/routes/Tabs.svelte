<script>
  export let tabs = [
    {
      value: '',
      label: '',
    },
  ];
  export let currentTab = '';
  export let onChange = (val = '') => {
    return () => {};
  };
</script>

<div class="w-full h-full flex flex-col border-4 border-gray-200 rounded-lg">
  <div class="p-2 flex justify-between border-b-4 border-gray-200">
    <div class="flex items-center">
      {#each tabs as tab}
        <button
          class="relative text-center border-r-1 border-t-0 border-b-0 border-l-0 rounded-none mr-3 {currentTab ===
          tab.value
            ? 'text-black font-bold'
            : 'text-gray'} focus:outline-none w-16 text-left p-3"
          on:click={onChange(tab.value)}
        >
          {tab.label}

          {#if currentTab === tab.value}
            <span class="absolute w-full bottom-0 left-0 h-1 bg-yellow-500" />
          {/if}
        </button>
      {/each}
    </div>
    <slot name="button" />
  </div>

  <div class="p-2">
    <slot />
  </div>
</div>
