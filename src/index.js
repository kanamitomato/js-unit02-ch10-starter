import MailValidator from './lib/MailValidator';
import PasswordValidator from './lib/PasswordValidator';
import 'whatwg-fetch';

const endpoint = 'http://localhost:3000';

const validate = (email, password) => {
  const mailValidator = new MailValidator(email);
  const passwordValidator = new PasswordValidator(password);
  return Promise.all([
    mailValidator.validate(),
    passwordValidator.validate(),
  ]);
};

const removeErrors = () => {
  Promise((resolve) => {
    document.querySelectorAll('.is-invalid').forEach((el) => {
      el.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach((el) => {
      el.parentNode.removeChild(el);
    });
    resolve();
  });
};

const addErrorMessage = (type, message) => {
  const input = document.getElementById(type);
  input.classList.add('is-invalid');
  input.insertAdjacentHTML('afterend', `<div class='invalid-feedback'>${message}</div>`);
};

const login = (email, password) => {
  fetch(`${endpoint}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
      const json = res.json();
      if (res.status === 200) { // ログイン成功
        return json;
      }// ログイン失敗
      return Promise.reject(new Error('ログイン失敗'));
    });
};

const onSubmit = async () => {
  await removeErrors();
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailVal = emailInput.value;
  const passwordVal = passwordInput.value;
  const results = await validate(emailVal, passwordVal);
  if (results[0].success && results[1].success) {
    login(emailVal, passwordVal)
      .then((json) => {
        alert(json.message);
      })
      .catch((err) => {
        alert(err.message);
      });
  } else if (results[0].success) {
    addErrorMessage('password', results[1].message);
  } else if (results[1].success) {
    addErrorMessage('email', results[0].message);
  } else {
    addErrorMessage('password', results[1].message);
    addErrorMessage('email', results[0].message);
  }
};

{
  const submit = document.getElementById('submit');
  submit.addEventListener('click', onSubmit);
}
