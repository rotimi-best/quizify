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

<div class="w-full flex flex-col">
  <div class="flex items-center p-2">
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
          <span class="absolute w-full bottom-0 left-0 h-1 bg-blue-500" />
        {/if}
      </button>
    {/each}
  </div>

  <div class="mt-4">
    <slot />
  </div>
</div>
