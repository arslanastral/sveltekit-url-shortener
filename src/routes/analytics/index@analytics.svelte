<script>
  import DeviceIcon from '$lib/assets/DeviceIcon.svelte';
  import LocationIcon from '$lib/assets/LocationIcon.svelte';
  import SourceIcon from '$lib/assets/SourceIcon.svelte';

  import Clicks from '$lib/components/analytics/Clicks.svelte';
  import DataPoint from '$lib/components/analytics/DataPoint.svelte';
</script>

<div class="highlights flex">
  <Clicks clicks="29" title="Today" />
  <DataPoint name="Top Location" data="Westeros"><LocationIcon slot="icon" /></DataPoint>
  <DataPoint name="Top Source" data="Direct"><SourceIcon slot="icon" /></DataPoint>
  <DataPoint name="Top Device" data="Skynet"><DeviceIcon slot="icon" /></DataPoint>
</div>

<style>
  .highlights {
    gap: 20px;
  }
</style>
