<header>
  <div class="logo-container">
    <div class="logo-circle" />
    <div class="logo-text">ink</div>
  </div>
  <nav />
</header>
<main>
  <slot />
</main>

<style>
  .logo-circle {
    width: 70px;
    height: 70px;
    background: #dfed3e;
    border-radius: 50%;
    position: relative;
  }

  .logo-text {
    font-size: 45px;
    font-family: 'Merriweather';
    position: absolute;
    left: 16px;
    top: 0px;
  }
</style>
