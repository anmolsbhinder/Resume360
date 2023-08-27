// LeetCodeUserInfo.tsx

import React, { useEffect, useState } from "react";
import { leetcodeContest } from "../api/leetheat";

interface LeetCodeUserInfoProps {
	username: string;
}

const LeetCodeUserInfo: React.FC<LeetCodeUserInfoProps> = ({ username }) => {
	const [leetCodeUserContestInfo, setLeetCodeUserContestInfo] = useState<
		any | null
	>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await leetcodeContest(username);
				setLeetCodeUserContestInfo(data);
			} catch (error) {
				console.error("Error fetching LeetCode user contest info:", error);
				setLeetCodeUserContestInfo(null);
			}
		}

		fetchData();
	}, [username]);

	return (
		<div>
			{leetCodeUserContestInfo ? (
				<div>
					<p>
						Contests:{" "}
						{leetCodeUserContestInfo.userContestRanking.attendedContestsCount}
					</p>
					<p>
						Rating:{" "}
						{Math.round(leetCodeUserContestInfo.userContestRanking.rating)}
					</p>
					<p>
						Among top:{" "}
						{leetCodeUserContestInfo.userContestRanking.topPercentage}%
					</p>
				</div>
			) : (
				<p>Loading LeetCode user contest info...</p>
			)}
		</div>
	);
};

export default LeetCodeUserInfo;
