// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Allow all origins and methods for demonstration purposes
app.use(cors());
const port = 3001;

app.use(express.json());

app.post("/proxy-leetcode", async (req, res) => {
	const { query } = req.body;

	try {
		const response = await axios.post("https://leetcode.com/graphql", {
			query,
		});
		console.log(0);
		res.json(response.data);
	} catch (error) {
		res.status(500).json({ error: "Error fetching data" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
