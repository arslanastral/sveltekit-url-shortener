<script context="module">
  export async function load({ session }) {
    if (session.user) {
      return {
        status: 302,
        redirect: '/'
      };
    }
    return {};
  }
</script>

<script>
  import LogIn from '$lib/components/login/LogIn.svelte';
</script>

<LogIn />
