// Initialize Supabase
const supabaseUrl = 'https://tmyzeggviqugrpuzkxyr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRteXplZ2d2aXF1Z3JwdXpreHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyMTkxMDIsImV4cCI6MjAzODc5NTEwMn0.qk6XTURGRBMciirwCwYC_bEjF2MVWcm5aOFnDcwAkuY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Register User
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log("Form Submitted");  // Debugging line
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const redeemCode = document.getElementById('redeemCode').value;

    try {
        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: password
        }, {
            data: {
                name: name,
                redeem_code: redeemCode
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

