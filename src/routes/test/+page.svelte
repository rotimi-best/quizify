<!-- <script>
  import { useChat } from 'ai/svelte';

  const { input, handleSubmit, messages } = useChat();
</script>

<div>
  <ul>
    {#each $messages as message}
      <li>{message.role}: {message.content}</li>
    {/each}
  </ul>
  <form on:submit={handleSubmit}>
    <input
      bind:value={$input}
      class="w-full rounded-lg bg-gray-100 py-2 px-7"
    />
    <button type="submit" class="border border-gray-200">Send</button>
  </form>
</div> -->
