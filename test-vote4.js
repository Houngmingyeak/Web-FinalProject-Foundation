import axios from 'axios';
async function run() {
  try {
    const res = await axios.get('https://forum-istad-api.cheat.casa/api/v1/votes/7407', { validateStatus: () => true });
    console.log(res.status, JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.log(e.message);
  }
}
run();
