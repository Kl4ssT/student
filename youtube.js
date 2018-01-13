import Youtube from 'youtube-api';
import { YOUTUBE } from './app/config';

Youtube.authenticate({
    type: 'key',
    key: YOUTUBE.apikey
});

Youtube.channels.list({
    part: 'contentDetails',
    forUsername: 'DarduinMyMenlon'
}, (err, res) => {
    console.log(err, res.items[0].contentDetails);
});

/*const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const axios = require('axios');

const config = require('./app/config');

const oauth2Client = new OAuth2(
    config.YOUTUBE.client_id,
    config.YOUTUBE.secret,
    'http://localhost:8090/'
);

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube']
});

console.log(url);

axios.get(url)
    .then(result => console.log(result));

/*const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client
});

youtube.channels.list({
    part: 'auditDetails',
    auth: config.YOUTUBE.apikey,
    forUsername: 'DarduinMyMenlon'
}, (err, response) => {
    if (err) console.log(err);
    console.log(response);
});*/