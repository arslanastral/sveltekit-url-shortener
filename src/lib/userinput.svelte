<script>
  let URL = '';
</script>

<div class="address-bar">
  <span class="url-icon">🌎</span>
  <input bind:value={URL} placeholder="Your Long URL Here" />
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
</style>
