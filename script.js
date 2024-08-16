// Initialize Supabase
const supabaseUrl = 'https://tmyzeggviqugrpuzkxyr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRteXplZ2d2aXF1Z3JwdXpreHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyMTkxMDIsImV4cCI6MjAzODc5NTEwMn0.qk6XTURGRBMciirwCwYC_bEjF2MVWcm5aOFnDcwAkuY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

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
