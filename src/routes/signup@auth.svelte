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
  import SignUp from '$lib/components/login/SignUp.svelte';
</script>

<SignUp />
