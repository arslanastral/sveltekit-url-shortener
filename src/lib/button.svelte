<script>
  const clickTest = () => {
    console.log("I'm Clicked :)");
  };

  export let title = 'Button';
  export let onClickFunc = clickTest;
</script>

<button on:click={onClickFunc}>{title}</button>

<style>
  :root {
    --color: black;
    --bg-color: white;
    --border-radius: 6px;
  }
  button {
    font-family: 'Inter';
    font-weight: 400;
    font-size: var(--font-size);
    padding: var(--padding);
    color: var(--color);
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
    border: var(--border);
  }
</style>
