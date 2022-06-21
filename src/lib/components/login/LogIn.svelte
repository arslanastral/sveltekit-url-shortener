<script>
  import LoginForm from './LoginForm.svelte';
</script>

<LoginForm
  isForSignUp={false}
  title="Log in to Ky"
  buttonTitle="Log In"
  endpoint="/auth/login"
  redirect="/dashboard"
/>
