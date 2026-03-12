import axios from 'axios';
async function run() {
    const urls = [
        ['GET', 'https://forum-istad-api.cheat.casa/api/v1/votes/types'],
        ['GET', 'https://forum-istad-api.cheat.casa/api/v1/voteTypes'],
        ['GET', 'https://forum-istad-api.cheat.casa/api/v1/vote-types'],
        ['GET', 'https://forum-istad-api.cheat.casa/api/v1/votetypes']
    ];
    for (const [method, url] of urls) {
        try {
            const res = await axios({ method, url, validateStatus: () => true });
            console.log(`${method} ${url} -> ${res.status}`);
        } catch (e) {
            console.log(`${method} ${url} -> failed: ${e.message}`);
        }
    }
}
run();
