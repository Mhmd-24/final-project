const register = () => {

    const name = document.getElementById('register-username');
    const mail = document.getElementById('register-email');
    const pass = document.getElementById('register-password');

    const username = name.value.trim();
    const email = mail.value.trim();
    const password = pass.value;

    if (username && email && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert('User already exists!');
            return;
        }
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registered successfully! You can now login.');
        name.value = '';
        mail.value = '';
        pass.value = ''
    }
}

const login = () => {

    const name = document.getElementById('login-username');
    const pass = document.getElementById('login-password');

    const username = name.value.trim();
    const password = pass.value;

    if (username === 'admin@quiz.com' && password === 'admin123') {
        window.location.href = 'dashboard.html';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => (user.username === username || user.email === username) && user.password === password);

    localStorage.setItem("loggedInUser", username);

    if (validUser) {
        name.value = '';
        pass.value = '';
        window.location.href = 'home.html';
        return;
    } else {
        name.value = '';
        pass.value = '';
        alert('Invalid credentials!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        register();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        login();
    });
});
