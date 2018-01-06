import app from './app';
import { PORT } from './config';

(async () => {
    try
    {
        await app.listen(PORT);
        console.log(`Server is running on port: ${PORT}`);
    }
    catch(err)
    {
        throw new Error(`Server: ${err}`);
    }
})();