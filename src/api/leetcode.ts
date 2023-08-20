import axios from "axios";

async function getLeetcodeDetails(userName: string) {
	try {
		const user = await axios.get(
			`https://leetcode-stats-api.herokuapp.com/${userName}`,
		);
		return user.data;
	} catch (err) {
		console.error("Error fetching LC details", err);
	}
}

export default getLeetcodeDetails;
