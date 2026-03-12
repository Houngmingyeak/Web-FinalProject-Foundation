import axios from 'axios';

async function run() {
    const urls = [
        ['POST', 'https://forum-istad-api.cheat.casa/api/v1/votes'],
        ['POST', 'https://forum-istad-api.cheat.casa/api/v1/votes/1'],
        ['POST', 'https://forum-istad-api.cheat.casa/api/v1/votes?postId=1&voteTypeId=1'],
        ['POST', 'https://forum-istad-api.cheat.casa/api/v1/votes/posts/1'],
        ['POST', 'https://forum-istad-api.cheat.casa/api/v1/questions/1/votes'],
        ['GET', 'https://forum-istad-api.cheat.casa/api/v1/votes/user/1'],
        ['GET', 'https://forum-istad-api.cheat.casa/api/v1/votes/users/1'],
        ['GET', 'https://forum-istad-api.cheat.casa/api/v1/users/1/votes'],
        ['GET', 'https://forum-istad-api.cheat.casa/api/v1/votes'],
        ['GET', 'https://forum-istad-api.cheat.casa/api/v1/votes/me'],
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
