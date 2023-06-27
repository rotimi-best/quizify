<script lang="ts">
  import { PUBLIC_GOOGLE_OAUTH_CLIENT_ID } from '$env/static/public';
  import { Circle3 } from 'svelte-loading-spinners';
  import { form, isExporting } from '$lib/stores/forms';
  import { getPostBodyFromQuestion } from '$lib/utils/googleapi';
  import type { QData } from '$lib/types/questions';
  import { goto } from '$app/navigation';
  import { toast } from '@zerodevx/svelte-toast';

  export let title = 'Some random title';
  export let questions: Array<QData>;
  export let onCompleteExport = () => {};

  let client;
  let access_token = '';
  let auth_token = { access_token: '' };
  let isFormCreated = false;

  // Set the scopes for the API request
  const scopes = [
    // 'https://www.googleapis.com/auth/forms',
    // 'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    // 'https://www.googleapis.com/auth/forms.body',
  ];

  async function makeRequest({ path = '', method = 'GET', body = {} }) {
    try {
      const response = await fetch(
        'https://forms.googleapis.com/v1/forms' + path,
        {
          method,
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
          body: method === 'GET' ? undefined : JSON.stringify(body),
        }
      );
      const result = await response.json();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async function getForm() {
    const newForm = await makeRequest({
      path: `/${$form.formId}`,
    });
    form.set(newForm);

    console.log('getForm res', newForm);
  }

  async function createForm() {
    const newForm = await makeRequest({
      method: 'POST',
      body: { info: { title } },
    });
    console.log('createForm res', newForm);

    form.set(newForm);
    return newForm;
  }

  async function addQuestionsToForm() {
    const updatedForm = await makeRequest({
      path: `/${$form.formId}:batchUpdate`,
      method: 'POST',
      body: getPostBodyFromQuestion(questions),
    });
    console.log('addQuestionsToForm res', updatedForm);
  }

  async function makeFormQuiz() {
    const body = {
      requests: [
        {
          updateSettings: {
            settings: {
              quizSettings: {
                isQuiz: true,
              },
            },
            updateMask: '*',
          },
        },
      ],
    };

    const updatedForm = await makeRequest({
      path: `/${$form.formId}:batchUpdate`,
      method: 'POST',
      body,
    });
    console.log('makeFormQuiz res', updatedForm);
  }

  async function connectToGoogle() {
    if (isFormCreated) {
      const url = `https://docs.google.com/forms/d/${$form.formId}`;
      if (window !== null) {
        window?.open(url, '_blank')?.focus();
      } else {
        goto(url);
      }
      return;
    }
    if (!questions.length) {
      toast.push('Hit the Generate button first to get your form content');
      return;
    }

    auth_token = JSON.parse(localStorage.getItem('auth_token') || '{}');
    $isExporting = true;
    // @ts-ignore
    client = google.accounts.oauth2.initTokenClient({
      client_id: PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
      scope: scopes.join(' '),
      callback: async (response = { access_token: '' }) => {
        console.log('responsePayload: ' + JSON.stringify(response));
        access_token = response.access_token;
        localStorage.setItem('auth_token', JSON.stringify(response));
        console.log('access_token', access_token);

        try {
          await createForm();
          await addQuestionsToForm();
          await makeFormQuiz();
          await getForm();
          onCompleteExport();
          isFormCreated = true;
        } catch (error) {
          console.error(
            'Something went wrong in the process, please try again later'
          );

          toast.push(
            'Something went wrong while exporting, please try again later',
            { classes: ['failed'] }
          );
        }

        $isExporting = false;
      },
    });
    client.requestAccessToken();
  }
</script>

<button
  id="google-forms"
  class="bg-white px-5 py-3 text-sm leading-5 rounded-md font-semibold shadow-md text-black flex items-center hover:shadow-2xl transition-shadow ease-in delay-100"
  on:click={connectToGoogle}
  disabled={$isExporting}
>
  {#if $isExporting}
    <Circle3 size="30" duration="1s" />
  {:else}
    <img
      alt="Google Forms icon"
      src="/google.svg"
      width="20"
      height="20"
      decoding="async"
      data-nimg="1"
      loading="lazy"
      style="color:transparent"
    />
    <span class="ml-3 hidden md:block">
      {#if isFormCreated}
        View Form
      {:else}
        Publish to Google Forms
      {/if}
    </span>
  {/if}
</button>
