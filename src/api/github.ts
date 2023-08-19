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
