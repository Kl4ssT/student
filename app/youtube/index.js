import Youtube from 'youtube-api';
import { YOUTUBE } from '../config';

Youtube.authenticate({
    type: 'key',
    key: YOUTUBE.apikey
});

export default Youtube;