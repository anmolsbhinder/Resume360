import axios from "axios";

interface Commit {
	url: string;
	title: string;
	repository_url: string;
}

const getCommitsByUsername = async (
	username: string,
	token: string,
): Promise<Commit[]> => {
	const apiUrl = `https://api.github.com/search/commits?q=author:${username}`;

	try {
		const response = await axios.get(apiUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// const commits: Commit[] = response.data.items.map(
		// 	(item: any) => ({
		// 		url: item.url,
		// 		title: item.title,
		// 		repository_url: item.repository_url,
		// 	}),
		// );

		console.log(response.data);

		return response.data;
	} catch (error) {
		console.error("Error fetching commits:", error);
		return [];
	}
};

export { getCommitsByUsername };
