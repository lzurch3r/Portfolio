import Auth from "./auth.js";

const myAuth = new Auth();

// myAuth.login(makeRequest('login', 'POST', {password: 'user1', email: 'user1@email.com'}));

/*makeRequest('login', 'POST', {
password: 'user1',
email: 'user1@email.com'
});*/

document.getElementById('submit-button').addEventListener('click', (e) => {
    e.preventDefault();
    myAuth.login();
});