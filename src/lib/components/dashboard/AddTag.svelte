<script>
  import TagIcon from '$lib/assets/TagIcon.svelte';
  import Button from '../Button.svelte';
  import TagColor from './TagColor.svelte';
  import Tag from './Tag.svelte';

  export let setTags;
  export let tags;

  let editing = false;
  let oldTag = '';

  let newTag = '';

  let TAG_COLORS = [
    {
      color: '#eaffad',
      selected: true
    },

    {
      color: '#81caff',
      selected: false
    },

    {
      color: '#ff9a6f',
      selected: false
    },

    {
      color: '#81ffbb',
      selected: false
    }
  ];

  const selectColor = (name) => {
    TAG_COLORS = TAG_COLORS.map((colors) => {
      colors.selected = colors.color === name;
      return colors;
    });

    if (editing) {
      tags = tags.map((tag) => {
        if (tag.name === oldTag) {
          tag.color = getCurrentColor();
        }
        return tag;
      });
    }

    setTags(tags);
  };

  const getCurrentColor = () => {
    return TAG_COLORS.find((color) => color.selected).color;
  };

  const tagExist = (name) => {
    return tags.some((tag) => tag.name === name);
  };

  const addTag = () => {
    let sanitizedTag = newTag.trim();

    if (editing) {
      tags = tags.map((tag) => {
        if (tag.name === oldTag) {
          tag.name = tagExist(sanitizedTag) ? tag.name : sanitizedTag;
          tag.color = getCurrentColor();
          newTag = '';
          oldTag = '';
          editing = false;
        }
        return tag;
      });
      return;
    }

    if (sanitizedTag.length) {
      if (tagExist(sanitizedTag)) {
        newTag = '';
        return;
      }
      tags = [
        ...tags,
        {
          name: sanitizedTag,
          color: getCurrentColor()
        }
      ];

      newTag = '';
    }
    setTags(tags);
  };

  const deleteTag = (name) => {
    if (editing) {
      return;
    }
    newTag = '';
    oldTag = '';
    tags = tags.filter((tag) => tag.name !== name);
    setTags(tags);
  };

  const editTag = (name, color) => {
    console.log('i gets triggered');
    if (editing) {
      return;
    }

    editing = true;
    selectColor(color);
    oldTag = name;
    newTag = name;
  };

  const onKeyPress = (e) => {
    if (e.charCode === 13) addTag();
  };
</script>

<div class="flex tag-container">
  <span class="tag-title">TAGS</span>
  <div class="flex tag-input">
    <div class="flex inputs-wrapper">
      <div class="flex input-box">
        <TagIcon />
        <input on:keypress={onKeyPress} bind:value={newTag} type="text" placeholder="Add a tag" />
      </div>
      <div class="flex center">
        {#each TAG_COLORS as tagColor}
          <TagColor
            --bg-color={tagColor.color}
            selected={tagColor.selected}
            {selectColor}
            color={tagColor.color}
          />
        {/each}
      </div>
    </div>
    <div class="fadeIn">
      <Button
        title={editing ? 'Update' : 'Add'}
        onClickFunc={addTag}
        type="button"
        --font-size="20px"
        --color="white"
        --padding="8px 18px"
        --bg-color="#3E5DFF"
        --border-radius="14px"
      />
    </div>
  </div>
  <div class="flex current-tags">
    {#each tags as tag}
      <Tag
        editable={true}
        tag={tag.name}
        --bg-color={tag.color}
        --color="black"
        color={tag.color}
        {deleteTag}
        {editTag}
        {oldTag}
      />
    {:else}
      <span>No tags added yet</span>
    {/each}
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
