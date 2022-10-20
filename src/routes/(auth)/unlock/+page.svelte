<script>
  import Unlock from '$lib/components/unlock/Unlock.svelte';

  export let data;

  let id = data.id;
</script>

<Unlock {id} />
