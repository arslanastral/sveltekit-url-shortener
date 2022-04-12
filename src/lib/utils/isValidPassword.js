let policy = {
  maxLength: {
    required: 64,
    info: 'Less than 64 Characters'
  },
  minLength: {
    required: 8,
    info: 'At least 8 characters'
  },
  uppercase: { required: 1, info: 'Upper case letters (A-Z)' },
  lowercase: { required: 1, info: 'Lower case letters (a-z)' },
  number: { required: 1, info: 'Numbers (0-9)' },
  special: { required: 1, info: 'Special characters (ex. !@#$%^&*)' }
};

export function isValidPassword(input) {
  let password = input.toString();
  let toFix = [];

  let uppercase = /[A-Z]/.test(password);
  let lowercase = /[a-z]/.test(password);
  let number = /\d/.test(password);
  let special = /\W/.test(password);

  if (password.length > policy.maxLength.required) toFix.push(policy.maxLength);
  if (password.length < policy.minLength.required) toFix.push(policy.minLength);
  if (!uppercase) toFix.push(policy.uppercase);
  if (!lowercase) toFix.push(policy.lowercase);
  if (!number) toFix.push(policy.number);
  if (!special) toFix.push(policy.special);

  return toFix.length ? toFix : true;
}
