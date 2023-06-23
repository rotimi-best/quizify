import { writable } from 'svelte/store';

export const form = writable({
  formId: '',
  info: {
    documentTitle: '',
    title: '',
  },
  responderUri: '',
  revisionId: '',
});

export const isExporting = writable(false);
