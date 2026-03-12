import axios from 'axios';
async function run() {
    const urls = [
        ['GET', 'https://forum-istad-api.cheat.casa/api/v1/votes/user/4980'],
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
