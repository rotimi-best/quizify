<script context="module">
  export function load({ url = { searchParams: { get: (e = '') => {} } } }) {
    const code = url.searchParams.get('code');
    return {
      props: {
        code,
      },
    };
  }
</script>

<script>
  export let code;

  // do stuff
  console.log('code', code);
</script>
