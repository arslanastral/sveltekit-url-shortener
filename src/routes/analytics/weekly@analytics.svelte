<script context="module">
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const res = await fetch('/api/analytics?time=week');

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
  import { WeeklyData } from '$lib/stores/HighlightsStore';
  import Highlights from '$lib/components/analytics/Highlights.svelte';
  export let data;

  $WeeklyData = data;
</script>

{#if $WeeklyData}
  <Highlights {...$WeeklyData} />
{:else}
  <Highlights />
{/if}
