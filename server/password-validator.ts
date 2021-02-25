import passwordValidator from "password-validator";
// Create a schema
const schema = new passwordValidator();

// Add properties to it
schema
  .is().min(10)                                    // Minimum length 10
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(2)                                // Must have at least 2 digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export const validatePassword = (password: string) => schema.validate(password, { list: true })

// // Validate against a password string
// console.log(schema.validate('validPASS123'));
// // => true
// console.log(schema.validate('invalidPASS'));
// // => false

// // Get a full list of rules which failed
// console.log(schema.validate('joke', { list: true }));
// // => [ 'min', 'uppercase', 'digits' ]
