<script>
  const clickTest = () => {
    console.log("I'm Clicked :)");
  };

  export let title = 'Button';
  export let type = 'button';
  export let onClickFunc = clickTest;
</script>

<button on:click={onClickFunc} {type}>{title}</button>

<style>
  :root {
    --color: black;
    --bg-color: white;
    --border-radius: 6px;
    --margin: 6px;
  }
  button {
    font-size: var(--font-size);
    padding: var(--padding);
    color: var(--color);
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
    border: var(--border);
    margin: var(--margin);

    transition: transform ease-in 0.1s, box-shadow ease-in 0.1s;
  }

  button:active {
    transform: scale(0.9);
  }

  button:hover {
    box-shadow: 0 2px 10px rgba(129, 129, 129, 0.3);
  }
</style>
