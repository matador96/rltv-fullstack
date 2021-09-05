const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const routes = require("./routes");
const config = require("./src/config/serverConfig.js");
const parser = require("./src/modules/parser");
const { getRankDistribution } = require("./src/modules/getRankDistribution");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());
routes(app);

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));

const cron = require("node-cron");

cron.schedule("0 0 */1 * * *", function () {
  // Every Hour
  parser.parseOnlinePlayers();
});

cron.schedule("0 0 */4 * * *", function () {
  // Every 4 Hour
  getRankDistribution();
});

if (process.env.CI) {
  console.log(`Tested success`);
  process.exit(0);
}
