<script>
  import LoginForm from './LoginForm.svelte';
</script>

<LoginForm
  isForSignUp={false}
  title="Welcome Back"
  buttonTitle="Log In"
  endpoint="/auth/login"
  redirect="/dashboard"
/>
