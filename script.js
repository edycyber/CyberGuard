// Initialize Supabase
const supabaseUrl = 'https://tmyzeggviqugrpuzkxyr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRteXplZ2d2aXF1Z3JwdXpreHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyMTkxMDIsImV4cCI6MjAzODc5NTEwMn0.qk6XTURGRBMciirwCwYC_bEjF2MVWcm5aOFnDcwAkuY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Register User
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const redeemCode = document.getElementById('redeemCode').value;

    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
    }, {
        data: {
            name: name,
            redeem_code: redeemCode
        }
    });

    if (error) {
        alert('Registration failed: ' + error.message);
    } else {
        alert('Registration successful!');
        window.location.href = 'dashboard.html';
    }
});

// Login User
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password
    });

    if (error) {
        alert('Login failed: ' + error.message);
    } else {
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    }
});

// Logout User
document.getElementById('logout').addEventListener('click', async function(event) {
    await supabase.auth.signOut();
    alert('Logged out successfully!');
    window.location.href = 'index.html';
});

// Function to insert data into Supabase
async function insertData(newData) {
    const { data, error } = await supabase
        .from('users')
        .insert([newData]);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Data inserted:', data);
    }
}

// Example usage: Form submission
function submitForm(event) {
    event.preventDefault();
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;

    const newData = { column1: input1, column2: input2 };
    insertData(newData);
}

// Listen for changes in your table
supabase
.channel('users')
.on('postgres_changes', { event: '*', schema: 'public', table: 'your-table-name' }, payload => {
  console.log('Change received!', payload);
})
.subscribe();
