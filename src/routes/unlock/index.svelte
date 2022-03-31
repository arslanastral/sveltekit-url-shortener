<script context="module">
  export async function load({ url }) {
    const id = url.searchParams.get('id');

    if (!id || id.length > 4) {
      return {
        status: 302,
        redirect: '/'
      };
    }

    return {
      props: {
        id
      }
    };
  }
</script>

<script>
  import Unlock from '$lib/components/unlock/Unlock.svelte';

  export let id;
</script>

<div class="wrapper">
  <Unlock {id} />
</div>

<style>
  .wrapper {
    background: #6831ff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
  }
</style>
