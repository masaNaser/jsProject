async function loginUser(username, password) {
    try{
        const response = await axios.post('https://dummyjson.com/auth/login', {
            username: username,
            password: password
        });       
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;

    try {
        const userData = await loginUser(username, password);
        console.log('Login successful:', userData);
        window.location.href = '../../index.html'; 
    } catch (error) {
        console.error('Login failed:', error);
    }
});