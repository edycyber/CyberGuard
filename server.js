require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const supabaseUrl = 'https://tmyzeggviqugrpuzkxyr.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// Example POST route for registration
app.post('/register', async (req, res) => {
    const { email, password, name, redeemCode } = req.body;

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    redeem_code: redeemCode,
                },
            },
        });

        if (error) throw error;

        res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.send('This is the Dashboard!');
});

// About page route
app.get('/about', (req, res) => {
    res.send('About Us: This page contains information about our application.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


