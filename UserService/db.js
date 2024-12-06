const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const checkDBConnection = async () => {
    try {
        const { data, error } = await supabase.from('users').select('*').limit(1);
        if (error) {
            console.error('Database connection failed:', error.message);
        } else {
            console.log('Database connected successfully.');
        }
    } catch (err) {
        console.error('Unexpected error during database connection check:', err.message);
    }
};

// Immediately test the database connection on startup
checkDBConnection();
module.exports = supabase;
