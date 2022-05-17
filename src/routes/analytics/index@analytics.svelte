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

      let highlights = {
        clickCount: data[0].clicks[0].count.toString(),
        clickTitle: 'Today',
        topLocation: data[0].location[0].name.toString(),
        topSource: data[0].source[0].name.toString(),
        topDevice: data[0].device[0].name.toString()
      };

      return {
        props: {
          highlights
        }
      };
    } else {
      return {
        props: {
          error: 'Error loading highlights'
        }
      };
    }
  }
</script>

<script>
  import { TodayData } from '$lib/stores/HighlightsStore';

  export let highlights;

  $TodayData = highlights;
</script>
