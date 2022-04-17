<script>
  import CheckIcon from '$lib/assets/CheckIcon.svelte';
  import TagIcon from '$lib/assets/TagIcon.svelte';
  import Button from '../Button.svelte';
</script>

<div class="flex tag-container">
  <span class="tag-title">TAGS</span>
  <div class="flex tag-input">
    <div class="flex inputs-wrapper">
      <div class="flex input-box">
        <TagIcon />
        <input type="text" placeholder="Add a tag" />
      </div>
      <div class="flex circles">
        <button class="flex yellow">
          <CheckIcon />
        </button>
        <button class="flex blue" />
        <button class="flex green" />
        <button class="flex red" />
      </div>
    </div>
    <Button
      title="ADD"
      type="button"
      --font-size="20px"
      --color="white"
      --padding="8px 18px"
      --bg-color="#3E5DFF"
      --border-radius="14px"
    />
  </div>
</div>

<style>
  .tag-container {
    width: 55%;
    flex-direction: column;
    align-items: flex-start;
    margin: 30px auto 0 22px;
  }

  .tag-title {
    font-weight: 600;
    font-size: 19px;
    letter-spacing: -0.035em;
    margin-bottom: 5px;
    color: #404040;
  }

  .tag-input {
    background: white;
    color: black;
    border: 1px solid rgb(104, 104, 104);
    border-radius: 16px;
    justify-content: space-between;
  }

  input {
    width: 100%;
    font-size: 20px;
    background: none;
    border: 0;
  }

  input:focus {
    outline: none;
    border: 0;
  }

  .circles {
    justify-content: space-evenly;
  }

  .circles * {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    margin: 5px;
    border: none;
  }

  .yellow {
    background: #eaffad;
  }

  .blue {
    background: #81caff;
  }

  .green {
    background: #ff9a6f;
  }

  .red {
    background: #81ffbb;
  }
</style>
