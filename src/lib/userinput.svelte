<script>
  import Icon from '@iconify/svelte';
  let URL = '';
</script>

<div class="address-bar">
  <Icon icon="mdi:web" color="#ccc" width="25" height="25" style="margin-left: 15px" />
  <input bind:value={URL} placeholder="Paste Long URL Here" />
</div>

<style>
  input {
    font-size: 20px;
    background: none;
    border: 0;
  }

  input:focus {
    outline: none;
    border: 0;
  }

  .address-bar {
    display: flex;
    align-items: center;
  }
</style>
