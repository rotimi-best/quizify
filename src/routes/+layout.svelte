<script>
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  import '../app.css';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<main>
  <Header />
  <slot />
  <Footer />
</main>
