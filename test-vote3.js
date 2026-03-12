import axios from 'axios';
async function test() {
  const urls = [
      'https://forum-istad-api.cheat.casa/api/v1/votes?pageNumber=1&pageSize=10',
      'https://forum-istad-api.cheat.casa/api/v1/votes?page=0&size=10',
      'https://forum-istad-api.cheat.casa/api/v1/votes?page=1&limit=10',
      'https://forum-istad-api.cheat.casa/api/v1/votes/list',
      'https://forum-istad-api.cheat.casa/api/v1/votes'
  ];
  for (let u of urls) {
      try {
        let res = await axios.get(u, { validateStatus: () => true });
        console.log(u, '=>', res.status);
      } catch (e) { console.log(e.message); }
  }
}
test();
