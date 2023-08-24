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
			<h2>LeetCode User Contest Info</h2>
			{leetCodeUserContestInfo ? (
				<div>
					<h3>Contest Ranking</h3>
					{/* Display the fetched data */}

					<h3>Contest Ranking History</h3>
					{/* Display the fetched data */}
				</div>
			) : (
				<p>Loading LeetCode user contest info...</p>
			)}
		</div>
	);
};

export default LeetCodeUserInfo;
