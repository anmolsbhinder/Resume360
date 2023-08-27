const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

// Allow all origins and methods for demonstration purposes
app.use(cors());

app.use(express.json());

app.post("/proxy-endpoint", async (req, res) => {
	const { targetUrl, requestData } = req.body;

	try {
		const response = await axios.post(targetUrl, requestData);
		res.json(response.data);
	} catch (error) {
		res.status(500).json({ error: "Error fetching data" });
	}
});

app.listen(port, () => {
	console.log(`Proxy server is running on port ${port}`);
});
