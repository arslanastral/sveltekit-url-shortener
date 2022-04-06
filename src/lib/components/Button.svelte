<script>
  export let title = 'Button';
  export let type = 'button';
  export let onClickFunc = undefined;
</script>

<button on:click={onClickFunc} {type}>{title}</button>

<style>
  :root {
    --color: black;
    --bg-color: white;
    --border-radius: 6px;
    --margin: 6px;
    --transform: scale(0.9);
  }
  button {
    font-size: var(--font-size);
    padding: var(--padding);
    color: var(--color);
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
    border: var(--border);
    margin: var(--margin);
    cursor: pointer;
    transition: transform ease-out 0.1s, border ease-in 0.1s;
  }

  button:active {
    transform: var(--transform);
  }
</style>
