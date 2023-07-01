<script lang="ts">
  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent,
    Content,
  } from 'carbon-components-svelte';
  import Rocket from 'carbon-icons-svelte/lib/Rocket.svelte';
  import Account from 'carbon-icons-svelte/lib/Account.svelte';
  import Need from 'carbon-icons-svelte/lib/Need.svelte';
  import SendAltFilled from 'carbon-icons-svelte/lib/SendAltFilled.svelte';
  import Logout from 'carbon-icons-svelte/lib/Logout.svelte';
  import Gift from 'carbon-icons-svelte/lib/Gift.svelte';
  import Map from 'carbon-icons-svelte/lib/Map.svelte';
  import NotebookReference from 'carbon-icons-svelte/lib/NotebookReference.svelte';
  import Email from 'carbon-icons-svelte/lib/Email.svelte';
  import Launch from 'carbon-icons-svelte/lib/Launch.svelte';
  import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
  import CloseOutline from 'carbon-icons-svelte/lib/CloseOutline.svelte';
  import IbmWatsonNaturalLanguageUnderstanding from 'carbon-icons-svelte/lib/IbmWatsonNaturalLanguageUnderstanding.svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import AddAlt from 'carbon-icons-svelte/lib/AddAlt.svelte';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';

  import '../app.css';

  export let data;

  let isSideNavOpen = true;
  let isProfileOpen = false;

  const quizTopics = [
    'JavaScript Basics',
    'HTML & CSS Fundamentals',
    'Responsive Web Design',
    'DOM Manipulation',
    'Functions & Scope',
    'Arrays & Objects',
    'Conditional Statements',
    'Loops & Iteration',
    'AJAX & APIs',
    'ES6 Features',
    'Regular Expressions',
    'Error Handling',
    'Browser Storage',
    'Event Handling',
    'Debugging Techniques',
    'Asynchronous Programming',
    'Functional Programming Concepts',
    'Prototype & Inheritance',
    'Security Best Practices',
    'Performance Optimization',
    'Unit Testing',
    'Module Bundlers',
    'Frontend Frameworks',
    'Backend Technologies',
    'RESTful APIs',
    'Authentication & Authorization',
    'Database Design',
    'SQL Fundamentals',
    'NoSQL Databases',
    'GraphQL Basics',
    'Serverless Architecture',
    'Version Control Systems',
    'Build Automation',
    'Continuous Integration',
    'Web Accessibility',
    'Cross-Browser Compatibility',
    'Progressive Web Apps',
    'Websockets & Real-Time Communication',
    'Web Performance Metrics',
    'UI/UX Principles',
    'Design Patterns',
    'Responsive Images & Media',
    'CSS Preprocessors',
    'Frontend Build Tools',
    'Web Animation Techniques',
    'Web Security Vulnerabilities',
    'Caching Strategies',
    'REST vs. GraphQL',
    'JavaScript Frameworks Comparison',
    'Cloud Computing Basics',
  ];

  $: ({ supabase, session } = data);

  onMount(() => {
    console.log('session', session);
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });

  inject({ mode: dev ? 'development' : 'production' });
</script>

<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<Header platformName="Quizify AI" class="text-black" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>

  <SideNav bind:isOpen={isSideNavOpen}>
    <div class="w-full justify-center">
      <button
        class="border border-gray m-1 mt-2 w-11/12 rounded-md p-3 flex items-center"
      >
        <AddAlt size={20} class="mr-3" />
        <span class="text-base font-sans font-bold">New Quiz</span>
      </button>
    </div>

    <SideNavItems>
      <div class="px-3">
        <p class="text-sm mb-2">Quizzes</p>
      </div>
      {#each quizTopics as topic}
        <SideNavLink
          icon={IbmWatsonNaturalLanguageUnderstanding}
          class="mt-2"
          text={topic}
        />
      {/each}
    </SideNavItems>
    <div class="w-full flex justify-center mb-3">
      <div
        class="upgrade m-1 mb-10 w-11/12 rounded-2xl p-3 flex items-center flex-col"
      >
        <Rocket size={32} class="my-2 text-white" />
        <h4 class="text-lg mb-4 text-white font-extrabold">
          Unlock Pro Features
        </h4>
        <button
          class="bg-yellow-500 hover:bg-yellow-700 px-5 py-3 text-sm leading-5 rounded-lg font-semibold flex items-center shadow-2xl transition-shadow ease-in delay-100 text-white"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  </SideNav>

  <HeaderUtilities>
    <HeaderAction
      bind:isOpen={isProfileOpen}
      icon={UserAvatarFilledAlt}
      closeIcon={CloseOutline}
    >
      <HeaderPanelLinks>
        <!-- Account Section -->
        <HeaderPanelDivider>Account</HeaderPanelDivider>
        <HeaderPanelLink class="flex items-center">
          <UserAvatarFilledAlt size={20} class="mr-2" />
          Rotimi Best
        </HeaderPanelLink>
        <HeaderPanelLink class="flex items-center">
          <Account size={20} class="mr-2" />
          Billing
        </HeaderPanelLink>
        <HeaderPanelLink class="flex items-center">
          <Logout size={20} class="mr-2" />
          Logout
        </HeaderPanelLink>

        <!-- Resources -->
        <HeaderPanelDivider>Resources</HeaderPanelDivider>
        <HeaderPanelLink class="flex items-center">
          <Launch size={20} class="mr-2" />
          Getting Started
        </HeaderPanelLink>
        <HeaderPanelLink class="flex items-center">
          <Gift size={20} class="mr-2" />
          What's New
        </HeaderPanelLink>
        <HeaderPanelLink class="flex items-center">
          <Map size={20} class="mr-2" />
          Roadmap
        </HeaderPanelLink>
        <HeaderPanelLink class="flex items-center">
          <NotebookReference size={20} class="mr-2" />
          Blog
        </HeaderPanelLink>

        <HeaderPanelDivider>Help</HeaderPanelDivider>
        <HeaderPanelLink
          href="https://help.quizify.xyz"
          target="_blank"
          class="flex items-center"
        >
          <Need size={20} class="mr-2" />
          Help Center
        </HeaderPanelLink>
        <HeaderPanelLink
          href="mailto:support@quizify.xyz"
          target="_blank"
          class="flex items-center"
        >
          <Email size={20} class="mr-2" />
          Send us an email
        </HeaderPanelLink>
        <HeaderPanelLink
          href="https://twitter.com/rotimi_best"
          target="_blank"
          class="flex items-center"
        >
          <SendAltFilled size={20} class="mr-2" />
          Tweet me @rotimi_best
        </HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>

<Content id="main-content">
  <slot />
</Content>

<style>
  :global(.bx--side-nav__icon) {
    margin-right: 0.3rem !important;
  }
  :global(.bx--side-nav__icon svg) {
    width: 1.8rem;
    height: 1.8rem;
  }

  :global(.bx--header__action svg) {
    margin: auto;
  }

  :global(#main-content) {
    margin-left: 16rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .upgrade {
    height: 100%;
    width: 100%;
    cursor: pointer;
    overflow: hidden;
    border-radius: 0.25rem;
    background-color: #fafafa;
    background-image: url(/upgrade.jpeg);
    background-position: center;
  }
</style>
