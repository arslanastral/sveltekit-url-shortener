<script context="module">
  export async function load({ url }) {
    const id = url.searchParams.get('id');

    if (!id) {
      return {
        status: 302,
        redirect: '/'
      };
    }

    return {
      props: {
        id: url
      }
    };
  }
</script>

<script>
  export let id;
</script>

<div>Requested ID is: {id} ✨</div>

<style>
</style>
