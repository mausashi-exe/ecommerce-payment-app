require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    service: "ECOMMERCE_PAYMENT_CORE",
    status: "OPERATIONAL",
    timestamp: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(`/// PAYMENT SERVICE RUNNING ON PORT ${PORT}`);
});
