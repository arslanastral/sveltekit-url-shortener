<script context="module">
  import { getStats } from '$lib/utils/getStats';
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }
    return {};
  }
</script>

<script>
  import Analytics from '$lib/components/analytics/Analytics.svelte';
</script>

<div class="fadeIn wrapper">
  <Analytics />
</div>

<style>
  .wrapper {
    background-repeat: repeat;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 90vh;
  }
</style>
