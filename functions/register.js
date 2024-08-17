// functions/register.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tmyzeggviqugrpuzkxyr.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
    const { email, password, name, redeemCode } = JSON.parse(event.body);

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

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Registration successful!' }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

