import axios from 'axios';
async function test() {
  const url = 'https://forum-istad-api.cheat.casa/api/v1/vote-types';
  try {
    const res = await axios.get(url, { validateStatus: () => true });
    console.log(res.status, res.data);
  } catch (e) {
    console.log(e.message);
  }
}
test();
