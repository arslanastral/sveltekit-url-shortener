<script>
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import Unlock from '$lib/components/unlock/Unlock.svelte';

  export let id;
</script>

<Unlock {id} />
