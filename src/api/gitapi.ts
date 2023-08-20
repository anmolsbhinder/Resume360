import axios from "axios";
// import process from "process";

const githubToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
// const githubToken: string = process.env.GITHUB_ACCESS_TOKEN || "";

const fetchGithub = async (username: string) => {
	try {
		// console.log(githubToken);
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

export { fetchGithub };
