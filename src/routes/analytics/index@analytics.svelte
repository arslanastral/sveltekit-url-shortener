<script>
  import Highlights from '$lib/components/analytics/Highlights.svelte';

  let data = {
    clickCount: '0',
    clickTitle: 'Today',
    topLocation: 'No Data',
    topSource: 'No Data',
    topDevice: 'No Data'
  };
</script>

<Highlights {...data} />
