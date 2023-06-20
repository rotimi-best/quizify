<script>
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import '../app.css';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<main>
  <Header />
  <slot />
  <Footer />
</main>
