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
  import Settings from '$lib/components/settings/Settings.svelte';
</script>

<div class="fadeIn wrapper">
  <Settings />
</div>

<style>
  .wrapper {
    background-repeat: repeat;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 90vh;
  }
</style>
