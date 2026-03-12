import axios from 'axios';
async function run() {
    const urls = [
        ['POST', 'https://forum-istad-api.cheat.casa/api/v1/votes/1'],
        ['POST', 'https://forum-istad-api.cheat.casa/api/v1/votes']
    ];
    for (const [method, url] of urls) {
        try {
            const res = await axios({ method, url, data: {}, validateStatus: () => true });
            console.log(`${method} ${url} -> ${res.status}`);
        } catch (e) {
            console.log(`${method} ${url} -> failed: ${e.message}`);
        }
    }
}
run();
