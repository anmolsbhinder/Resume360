/* eslint-disable */
import React, { useEffect, useState } from "react";
import { fetchGithub } from "../api/gitapi";
import { getContributions } from "../api/githeat";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import { getPullRequestsByUsername } from "../api/gitpull";
import { getCommitsByUsername } from "../api/gitcommit";
import "react-calendar-heatmap/dist/styles.css";
import process from "process";

// const githubToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
const githubToken: string = process.env.VITE_GITHUB_ACCESS_TOKEN || "";

interface GithubProps {
	username: string;
}

const Github: React.FC<GithubProps> = ({ username }) => {
	const [userInfo, setUserInfo] = useState<any | null>(null);
	const [contributionData, setContributionData] = useState<any | null>(null);
	const [pullData, setPullData] = useState<any | null>(null);
	const [commitData, setCommitData] = useState<any | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const userData = await fetchGithub(username);
				setUserInfo(userData);

				const contributions = await getContributions(githubToken, username);
				// console.log("Contributions:", contributions);
				setContributionData(contributions);
				// console.log("Contributions:", contributionData);

				const pullRequests = await getPullRequestsByUsername(
					username,
					githubToken,
				);
				setPullData(pullRequests);

				const commits = await getCommitsByUsername(username, githubToken);
				setCommitData(commits);

				// console.log(pullRequests);
			} catch (error) {
				console.error("Error fetching data:", error);
				setUserInfo(null);
			}
		}

		fetchData();
	}, [username]);

	// console.log(commitData);
	// console.log("Contributions:", contributionData);

	return (
		<div>
			{userInfo ? (
				<div>
					<h2 className="demo2">GitHub</h2>
					<p>Repositories: {userInfo.userInfo.public_repos}</p>
					<p>Followers: {userInfo.userInfo.followers}</p>
					<p>Stars: {userInfo.stars.length}</p>

					{pullData ? (
						<p>Pull Requests: {pullData.total_count}</p>
					) : (
						<p>Loading PR data...</p>
					)}

					{commitData ? (
						<p>Commits: {commitData.total_count}</p>
					) : (
						<p>Loading Commits...</p>
					)}

					{/* <p>Pull Requests: {pullData.length}</p> */}

					{contributionData && (
						<div className="calendar">
							<ReactCalendarHeatmap
								startDate={new Date("2022-09-01")}
								endDate={new Date("2023-08-31")}
								values={contributionData.user.contributionsCollection.contributionCalendar.weeks.flatMap(
									(week: any) =>
										week.contributionDays.map((day: any) => ({
											date: day.date,
											count: day.contributionCount,
										})),
								)}
								gutterSize={3}
								classForValue={(value) => {
									if (!value) {
										return "color-empty";
									}

									if (value.count === 0) {
										return "color-scale-0";
									} else if (value.count <= 5) {
										return "color-scale-1";
									} else if (value.count <= 10) {
										return "color-scale-2";
									} else {
										return "color-scale-3";
									}
								}}
							/>
						</div>
					)}

					{contributionData ? (
						<p>
							Last year Contributions:{" "}
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

export default Github;
