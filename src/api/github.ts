// src/api.ts
import axios from "axios";

const githubToken = "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"; // Replace with your GitHub token

const fetchGitHubUserInfo = async (username: string) => {
	try {
		const [userInfoResponse, starsResponse] = await Promise.all([
			axios.get(`https://api.github.com/users/${username}`, {
				headers: {
					Authorization: `token ${githubToken}`,
				},
			}),
			axios.get(`https://api.github.com/users/${username}/starred`, {
				headers: {
					Authorization: `token ${githubToken}`,
				},
			}),
		]);

		//   console.log(userInfoResponse.data);
		return { userInfo: userInfoResponse.data, stars: starsResponse.data };
	} catch (error) {
		throw new Error("Error fetching GitHub user info");
	}
};

export { fetchGitHubUserInfo };