const app = require("./app");

require("dotenv").config();
const port = process.env.Port;


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});