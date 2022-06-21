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

<Unlock {id} />
