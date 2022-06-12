<script>
  import BrowserIcon from '$lib/assets/BrowserIcon.svelte';
  import DeviceIcon from '$lib/assets/DeviceIcon.svelte';
  import LocationIcon from '$lib/assets/LocationIcon.svelte';
  import OSIcon from '$lib/assets/OSIcon.svelte';
  import SourceIcon from '$lib/assets/SourceIcon.svelte';
  import Clicks from '$lib/components/analytics/Clicks.svelte';
  import DataPoint from '$lib/components/analytics/DataPoint.svelte';

  export let clickCount = '0';
  export let clickTitle = 'Today';
  export let topLocation = 'No Data';
  export let topSource = 'No Data';
  export let topDevice = 'No Data';
  export let topBrowser = 'No Data';
  export let topOS = 'No Data';
</script>

<div class="highlights flex">
  <Clicks clicks={clickCount} title={clickTitle} />
  <DataPoint name="Top Location" data={topLocation}><LocationIcon slot="icon" /></DataPoint>
  <DataPoint name="Top Source" data={topSource}><SourceIcon slot="icon" /></DataPoint>
  <DataPoint name="Top Device" data={topDevice}><DeviceIcon slot="icon" /></DataPoint>
  <DataPoint name="Top Browser" data={topBrowser}><BrowserIcon slot="icon" /></DataPoint>
  <DataPoint name="Top OS" data={topOS}><OSIcon slot="icon" /></DataPoint>
</div>

<style>
  .highlights {
    gap: 20px;
    flex-wrap: wrap;
  }
</style>
