<script>
  export let text = '';
  export let questions = 2;
  export let options = 2;
  export let handleSubmit = (e = {}) => {};
  export let templateId = '';
  export let templates = [{ id: '', text: '' }];
  export let handleTemplateChange = () => {};
  export let isLoading = false;

  $: text = text.length > 1500 ? text.slice(0, 1500) : text;
  $: questions = questions > 5 ? 5 : questions;
  $: options = options > 4 ? 4 : options;
</script>

<form on:submit={handleSubmit}>
  <section class="rounded-lg bg-white p-5 shadow-lg h-full">
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
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <rect width="38" height="38" fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlink:href="#image0_5_130" transform="scale(0.0111111)" />
            </pattern>
            <image
              id="image0_5_130"
              width="90"
              height="90"
              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAENklEQVR4nO2cS2wVVRiAb7UURCCGCFFcGAIYwUCibHyUIjEhEcKGpJAgsCgG5LHUVGPUlbhxoW6MJtZKgwkxslFJCCwI0PKmPBZdscGoVQKNIdq0SD/yx9M4ud4Od2ZO7zlnzv8lXc4//3yde+Y8/nMqFUVRFEVRFEVRFEVRFEVRIgN4BngH+Am4AgwCtzz7k5wumxwl1yWVUABeBk4TLqeAtoqvANOBbykPPcBDFZ8A5gEXKB/ngMcrPiD/deAs5eWi/Fp9EF2m5mIielxLbiMeVrkUHXLvIit9LvvJsfG0C9HvEh9vuxB9KGey54FXgOOEx48uRMvQNQ+t5vqlwBhh0e9C9O85Ej1aFeN7wmLQheihjEn+Uj3KAmYD1yzL+AfYCXQAo5ZjD/ku+iIwP2X43mdRxneJ2F1EIlre1m1Ay31iNQObgQELMjYm4q4hAtHDwKyMMaeZeeK8/A3MSMRrydHEBSdaehSvZoy5omC7erBGzG8ouehxjgEv3CfWs8BhCyI21Yi9jkhEY97S7RPE2WSamaL8VaupAqYWbI6CEi3cBdZWxXgRGMEOn6bkujcm0cJv8sEz1z9osQ99G3gyJdfHLH0UgxEt7DLXv4Yd5KPbXke+a82vKhrRt4FuS+2mNDs7MuS8teD3ICjRtpBFh+dz5L0cOJHzntGIvmmG1Sst5C8f4i+BPzLcv9SibwL7TH+4ZRKe4wGZupVeC/BrjKLHTJva3MBnkp7QhpTRaSlF/9zwh/rv2QZiEi182MhKIWAu8F7Kyk9pRWP6vieBTmDBJDzHo6aJ+qGOCa1Si04yZhYJ3ihSgGjmPzrMAnGWQUw0opPImuWWHHm3m2W1PEQpepxPgKY6c95bcOU9atHCW3Xku4fiRC/6DrAsRfJTllbEgxd9C/gA6C0QY39Krl9YyjN40bsTdR7DBd7quTXynGVpBSd40X8CjyTifl0g1v+mTC3Oewcv+qOquIsLTNAfqZHnQewRrOgrwMM1Yr9foBxsTiLODFPrEbXo68DClKnL/Tnjvp6IsxG7BCf6SPLNmyB+k5nfGMnbfFhuNoIRfcdsBc606QZ4AvgYuJHhXp+Za8ZiFP1SwfvNNFWpLvFe9GjWgscJ7nkAt3gvWug35V9TctzrOeArD7ZiBCE62dvoqPMeS8yH0xeCEj1OV9qqNrDeFNsQu+g8m4Wq+XyS6qRLtVnokqXk22tMAkkxpI/0h7Shs5qryRUS4E38xcmGTjmDyBarE0Nv+Vj6SqcL0dIjsEUfsCiA/eWN33RvZMtBT7HQ60RyoncQC63ORBvZcppW2el2KjlxeNUZyssFLw6vEqQQ0RxdVjbOyEajik+YN1sKxstC9/gOMi8x1fM2TytoNL1F584bivQ55QwiGU3x73Dd10NgL5mS3U5n/WRFURRFURRFURRFURRFUSruuAf6X9cZIsFLFgAAAABJRU5ErkJggg=="
            />
          </defs>
        </svg>
        <span class="ml-1">Generate</span>
      </button>
    </div>
  </section>
</form>

<style>
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
</style>
