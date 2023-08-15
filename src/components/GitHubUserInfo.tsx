import React, { useEffect, useState } from "react";
import { fetchGitHubUserInfo } from "../api/github";
import { getContributions } from "../api/githeat";

interface GitHubUserInfoProps {
	username: string;
}

const GitHubUserInfo: React.FC<GitHubUserInfoProps> = ({ username }) => {
	const [userInfo, setUserInfo] = useState<any | null>(null);
	const [contributionData, setContributionData] = useState<any | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const userData = await fetchGitHubUserInfo(username);
				setUserInfo(userData);

				const contributions = await getContributions(
					"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",
					username,
				);
				console.log("Contributions:", contributions);
				setContributionData(contributions);

				console.log(contributionData);
			} catch (error) {
				console.error("Error fetching data:", error);
				setUserInfo(null);
			}
		}

		fetchData();
	}, [username]);

	return (
		<div>
			{userInfo ? (
				<div>
					<p>Repositories: {userInfo.userInfo.public_repos}</p>
					<p>Followers: {userInfo.userInfo.followers}</p>
					<p>Stars: {userInfo.stars.length}</p>
					{contributionData ? (
						<p>
							Contributions:{" "}
							{
								contributionData.user.contributionsCollection
									.contributionCalendar.totalContributions
							}
						</p>
					) : (
						<p>Loading contribution data...</p>
					)}
				</div>
			) : (
				<p>Error fetching GitHub user info</p>
			)}
		</div>
	);
};

export default GitHubUserInfo;
