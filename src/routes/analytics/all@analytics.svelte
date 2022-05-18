<script context="module">
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const res = await fetch('/api/analytics?time=all');

    if (res.ok) {
      const data = await res.json();
      if (Object.keys(data).length) {
        return {
          props: {
            data
          }
        };
      }
    }
    return {};
  }
</script>

<script>
  import { AllData } from '$lib/stores/HighlightsStore';
  import Highlights from '$lib/components/analytics/Highlights.svelte';
  export let data;

  $AllData = data;
</script>

{#if $AllData}
  <Highlights {...$AllData} />
{:else}
  <Highlights />
{/if}
