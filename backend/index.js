const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const countryRoutes = require("./routes/countryRoutes");
app.use("/api/countries", countryRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
