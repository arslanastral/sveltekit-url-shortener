<script>
  import Clicks from '$lib/components/analytics/Clicks.svelte';
  import DataPoint from '$lib/components/analytics/DataPoint.svelte';
</script>

<div class="highlights flex">
  <Clicks clicks="29" title="Today" />
  <DataPoint name="Top Location" data="Westeros" />
  <DataPoint name="Top Source" data="Direct" />
  <DataPoint name="Top Device" data="Skynet" />
</div>

<style>
  .highlights {
    gap: 20px;
  }
</style>
