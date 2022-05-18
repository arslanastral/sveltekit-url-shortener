<script context="module">
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const res = await fetch('/api/analytics');

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
  import { TodayData } from '$lib/stores/HighlightsStore';
  import Highlights from '$lib/components/analytics/Highlights.svelte';
  export let data;

  $TodayData = data;
</script>

{#if $TodayData}
  <Highlights {...$TodayData} />
{:else}
  <Highlights />
{/if}
