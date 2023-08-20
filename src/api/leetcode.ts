// src/api.ts
import axios from "axios";

const fetchLeetCodeSolvedCount = async (username: string): Promise<number> => {
	try {
		const response = await axios.get(
			`https://api.github.com/users/${username}`,
		);
		const submissions = response.data.submissions_dump;
		const solvedCount = submissions.filter(
			(submission: any) => submission.status === "Accepted",
		).length;
		return solvedCount;
	} catch (error) {
		throw new Error("Error fetching LeetCode solved count");
	}
};

export { fetchLeetCodeSolvedCount };
