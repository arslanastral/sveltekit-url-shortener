<script>
  import LoginForm from './LoginForm.svelte';
</script>

<LoginForm
  isForSignUp={true}
  title="Create Your Account"
  buttonTitle="Sign Up"
  endpoint="/auth/signup"
  redirect="/dashboard"
/>
