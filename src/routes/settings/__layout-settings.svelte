<script context="module">
  export async function load({ session }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }
    return {};
  }
</script>

<script>
  import '$lib/styles/global.css';
  import 'sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';
  import PageNavigation from '$lib/components/PageNavigation.svelte';

  let pages = [
    {
      name: 'Now',
      path: '/settings'
    },
    {
      name: 'Profile',
      path: '/settings/profile'
    },
    {
      name: 'Account',
      path: '/settings/account'
    }
  ];
</script>

<div class="fadeIn wrapper">
  <div class="flex container">
    <div class="main-title">Settings</div>
    <PageNavigation {pages} />
    <div class="settings-container flex">
      <slot />
    </div>
  </div>
</div>

<style>
  .wrapper {
    background-repeat: repeat;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 90vh;
  }

  .container {
    width: 80%;
    margin-top: 20px;
    flex-direction: column;
  }

  .main-title {
    width: 100%;
    font-size: 35px;
    font-weight: bold;
    margin: 10px 0;
  }

  .settings-container {
    width: 100%;
    margin-top: 30px;
    background-color: white;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    overflow: hidden;
    align-items: flex-start;
  }
</style>
