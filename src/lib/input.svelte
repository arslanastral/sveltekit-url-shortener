<script>
  import Button from '$lib/button.svelte';
  import UserInput from '$lib/userinput.svelte';
</script>

<div class="input-container flex">
  <UserInput />
  <Button
    title="Shortern"
    --font-size="20px"
    --padding="8px 18px"
    --color="white"
    --bg-color="#3E5DFF"
    --border-radius="29px"
    --margin="6px"
  />
</div>

<style>
  .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .input-container {
    width: 800px;
    height: 60px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 42px;
  }
</style>
