const { google } = require('googleapis');
const readline = require('readline');

const GOOGLE_CLIENT_ID =
  '1030459264266-t1h0ha3lfoncg9bgrhoqt7it3estfka5.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_CALLBACK_URL = 'http://localhost:3000/auth/google/callback';

const auth = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

console.log(
  'Visit this URL to get the authorization code:',
  auth.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  }),
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('Enter the code from the page: ', async (code) => {
  const { tokens } = await auth.getToken(code);
  console.log('Your Refresh Token:', tokens.refresh_token);
  rl.close();
});
