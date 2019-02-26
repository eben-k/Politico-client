/* eslint-disable*/

const email = document.getElementById('email');
const password = document.getElementById('password');
// const submitButton = document.getElementById('submit-button');
const alertBox = document.querySelector('.alert-box');
const baseUrl = 'https://politico-io.herokuapp.com/api/v1/auth/login';

document.getElementById('form').addEventListener('submit', (e) => {
  // prevent the normal submission of the form
  e.preventDefault();

  console.log(email.value, password.value);
  

  fetch(baseUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then(res => res.json())
    .then((output) => {
      console.log(output);
      if (output.status === 200) {
        const template = `<ul>
        <li class="alert-success">Login Successful</li>
        </ul>`;
        alertBox.innerHTML = template;
        const token = output.data.token;
        const isAdmin = output.data.user.isAdmin;
        const fullName = output.data.user.fullName;
        // const { token, isAdmin, fullName } = output;
        const userDetail = { token, isAdmin, fullName };
        localStorage.setItem('userDetail', JSON.stringify(userDetail));
        if (isAdmin === true) {
          window.location = 'admin.html';
        } else {
          window.location = 'profile.html';
        }
      } else if (Array.isArray(output)) {
        const template = `
            <ul>
              ${output.error.map(err => `<li class="alert-danger">${err}</li>`).join('')}
            </ul>
          `;
        alertBox.innerHTML = template;
      } else {
        alertBox.innerHTML = `<li class="alert-danger">${output.error}</li>`;
      }
    })
    .catch(err => console.log(err));
});
