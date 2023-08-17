import axios from "axios";

interface PullRequest {
	url: string;
	title: string;
	repository_url: string;
}

const getPullRequestsByUsername = async (
	username: string,
	token: string,
): Promise<PullRequest[]> => {
	const apiUrl = `https://api.github.com/search/issues?q=is:pr+author:${username}`;

	try {
		const response = await axios.get(apiUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const pullRequests: PullRequest[] = response.data.items.map(
			(item: any) => ({
				url: item.url,
				title: item.title,
				repository_url: item.repository_url,
			}),
		);

		return pullRequests;
	} catch (error) {
		console.error("Error fetching pull requests:", error);
		return [];
	}
};

export { getPullRequestsByUsername };
