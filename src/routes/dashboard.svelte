<script context="module">
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const res = await fetch('/api/user/links');

    if (res.ok) {
      const links = await res.json();
      return {
        props: {
          links
        }
      };
    } else {
      return {
        props: {
          error: 'Error loading links'
        }
      };
    }
  }
</script>

<script>
  import Dashboard from '$lib/components/dashboard/Dashboard.svelte';

  export let links;
  export let error;
</script>

<div class="wrapper">
  <Dashboard {links} {error} />
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
    /* min-width: 100vw; */
  }
</style>
