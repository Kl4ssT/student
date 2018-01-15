import Youtube from 'youtube-api';
import { YOUTUBE } from './app/config';

Youtube.authenticate({
    type: 'key',
    key: YOUTUBE.apikey
});

Youtube.videos.list({
    part: 'snippet',
    id: '7qsa6CoCJKE'
}, (err, res) => {
    console.log(res.items[0]);
});

/*({
    part: 'snippet',
    playlistId: 'UU18NaGQLruOEw65eQE3bNbg',
    forUsername: 'DarduinMyMenlon'
}, (err, res) => {
    console.log(err, res.items);
});*/