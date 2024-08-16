// Initialize Supabase
const supabaseUrl = 'https://tmyzeggviqugrpuzkxyr.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

//environment variables in Node.js
require('dotenv').config();
const supabaseKey = process.env.SUPABASE_KEY;


// Register User
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevents form from submitting traditionally

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const redeemCode = document.getElementById('redeemCode').value;

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    redeem_code: redeemCode
                }
            }
        });

        if (error) throw error;

        alert('Registration successful! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Registration failed: ' + error.message);
    }
});

// Login User
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        alert('Login successful! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Error during login:', error.message);
        alert('Login failed: ' + error.message);
    }
});
