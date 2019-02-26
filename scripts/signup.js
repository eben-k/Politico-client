/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone');
const passportUrl = document.getElementById('passport');
const password = document.getElementById('password');
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phoneError');
const passportError = document.getElementById('passportError');
const passwordError = document.getElementById('password-error');
const submitButton = document.getElementById('submit-button');
const successMessage = document.getElementById('signup-success');
const errorMessage = document.getElementById('signup-error');
const spinner = document.getElementById('spinner');
const alertBox = document.querySelector('.alert-box');
const baseUrl = 'https://politico-io.herokuapp.com/api/v1/auth/signup';
// const newUser = {
//   firstname: firstName.value,
//   lastname: lastName.value,
//   email: email.value,
//   phoneNumber: phoneNumber.value,
//   passportUrl: passportUrl.value,
//   password: password.value,
// };
document.getElementById('form').addEventListener('submit', (e) => {
  // prevent the normal submission of the form
  e.preventDefault();

  console.log(email.value, phoneNumber.value, passportUrl.value, firstName.value, lastName.value, password.value);

  fetch(baseUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      passportUrl: passportUrl.value,
      password: password.value,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 201) {
        const { token, isAdmin } = data;
        const userDetail = { email, token, isAdmin };
        localStorage.setItem('userDetail', JSON.stringify(userDetail));
        if (isAdmin === true) {
          window.location = 'admin.html';
        } else {
          window.location = 'profile.html';
        }
      } else if (Array.isArray(data)) {
        const template = `
            <ul>
              ${data.error.map(err => `<li class="alert-danger">${err}</li>`).join('')}
            </ul>
          `;
        alertBox.innerHTML = template;
      } else {
        alertBox.innerHTML = `<li class="alert-danger">${data.error}</li>`;
      }
    })
    .catch(err => console.log(err));
});
