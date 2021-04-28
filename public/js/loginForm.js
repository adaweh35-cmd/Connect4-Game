import { showAlert } from './alerts.js';
export const login = async (Email, Password) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/login',
        data: {
          Email,
          Password
        }
      });
      if (res.data.status === 'success') {
        showAlert('success', 'Logged in successfully!');
        window.setTimeout(() => {
        location.assign('/');
        }, 1500);
      }
  
    } catch (err) {
      console.log(err);
    }
};

const loginForm = document.querySelector('.form1');
const signButton = document.querySelector('.submit');

if (loginForm) 
    console.log("grsgsg");
    signButton.addEventListener('click', e => {
        console.log("gsragsfgsrg");
        e.preventDefault();
        const email = document.getElementById('un').value;
        const password = document.getElementById('pass').value;
        console.log(email);
        console.log(password);

        login(email, password);
  });
