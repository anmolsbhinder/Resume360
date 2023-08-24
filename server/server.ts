const express = require("express");
import axios from "axios";

const app = express();
const port = 3001;

app.use(express.json());

app.post(
	"/proxy-leetcode",
	async (
		req: { body: { query: any } },
		res: {
			json: (arg0: any) => void;
			status: (arg0: number) => {
				(): any;
				new (): any;
				json: { (arg0: { error: string }): void; new (): any };
			};
		},
	) => {
		const { query } = req.body;

		try {
			const response = await axios.post("https://leetcode.com/graphql", {
				query,
			});

			res.json(response.data);
		} catch (error) {
			res.status(500).json({ error: "Error fetching data" });
		}
	},
);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
