const axios = require('axios');
async function test() {
  try {
    const loginRes = await axios.post('https://forum-istad-api.cheat.casa/api/v1/auth/login', {
      email: "veasna@gmail.com",
      password: "password123!" // wait I don't know the password
    });
  } catch (e) {
    console.log(e.message);
  }
}
test();
