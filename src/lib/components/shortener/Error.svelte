<script>
  import Button from '../Button.svelte';

  export let error;
  export let action = undefined;
  export let actionName = 'Back';
  export let actionType = 'button';
</script>

<span class="error grow">{error}</span>
<Button
  title={actionName}
  onClickFunc={action}
  type={actionType}
  --font-size="20px"
  --padding="8px 18px"
  --color="white"
  --bg-color="black"
  --border-radius="29px"
  --transform="none"
/>

<style>
  .error {
    font-size: 20px;
    color: red;
    margin-left: 20px;
  }
</style>
