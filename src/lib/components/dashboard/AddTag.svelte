<script>
  import TagIcon from '$lib/assets/TagIcon.svelte';
  import Button from '../Button.svelte';
  import TagColor from './TagColor.svelte';
  import Tags from './Tags.svelte';

  let color = '#eaffad';

  let colors = [
    {
      background: '#eaffad',
      name: 'yellow',
      selected: true
    },

    {
      background: '#81caff',
      name: 'blue',
      selected: false
    },

    {
      background: '#ff9a6f',
      name: 'green',
      selected: false
    },

    {
      background: '#81ffbb',
      name: 'red',
      selected: false
    }
  ];

  const selectColor = (name) => {
    colors = colors.map((color) => {
      color.selected = color.name === name;
      return color;
    });
  };
</script>

<div class="flex tag-container">
  <span class="tag-title">TAGS</span>
  <div class="flex tag-input">
    <div class="flex inputs-wrapper">
      <div class="flex input-box">
        <TagIcon />
        <input type="text" placeholder="Add a tag" />
      </div>
      <div class="flex center">
        {#each colors as color}
          <TagColor
            --bg-color={color.background}
            selected={color.selected}
            name={color.name}
            {selectColor}
          />
        {/each}
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
  <div class="flex current-tags">
    <Tags editable={true} tag="Email" --bg-color="#eaffad" --color="black" />
    <Tags editable={true} tag="Email" --bg-color="#eaffad" --color="black" />
    <Tags editable={true} tag="Email" --bg-color="#eaffad" --color="black" />
    <Tags editable={true} tag="Email" --bg-color="#eaffad" --color="black" />
    <Tags editable={true} tag="Email" --bg-color="#eaffad" --color="black" />
    <Tags editable={true} tag="Email" --bg-color="#eaffad" --color="black" />
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

  .center {
    justify-content: space-evenly;
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

  .current-tags {
    margin-top: 10px;
    width: 100%;
    flex-wrap: wrap;
  }
</style>
