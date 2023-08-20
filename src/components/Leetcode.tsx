import { useEffect, useState } from "react";

import getLeetcodeDetails from "../api/leetcode";
import "../App.css";

interface LeetcodeUserDetails {
	totalSolved: number;
	easySolved: number;
	mediumSolved: number;
	hardSolved: number;
	acceptanceRate: number;
	ranking: number;
	contributionPoints: number;
	reputation: number;
}

const Leetcode: React.FC = () => {
	const userName = "P3rf3ct0";
	const [userDetails, setUserDetails] = useState<LeetcodeUserDetails>({
		totalSolved: 0,
		easySolved: 0,
		mediumSolved: 0,
		hardSolved: 0,
		acceptanceRate: 0,
		ranking: 0,
		contributionPoints: 0,
		reputation: 0,
	});
	// const [solvedCount, setSolvedCount] = wuseState<number | null>(null);

	useEffect(() => {
		async function getDetails() {
			setUserDetails(await getLeetcodeDetails(userName));
		}

		getDetails();
	}, [userName]);

	useEffect;

	return (
		userDetails && (
			<div className="leetcode">
				<h1 className="title">Leetcode</h1>
				{userDetails.totalSolved > 0 && (
					<p>Total Questions Solved: {userDetails.totalSolved}</p>
				)}
				{userDetails.easySolved > 0 && (
					<p>Questions Solved (Easy): {userDetails.easySolved}</p>
				)}
				{userDetails.mediumSolved > 0 && (
					<p>Questions Solved (Medium): {userDetails.mediumSolved}</p>
				)}
				{userDetails.hardSolved > 0 && (
					<p>Questions Solved (Hard): {userDetails.hardSolved}</p>
				)}
				{userDetails.acceptanceRate > 0 && (
					<p>Acceptance Rate: {userDetails.acceptanceRate}</p>
				)}
				{userDetails.ranking > 0 && <p>Rank: {userDetails.ranking}</p>}
				{userDetails.contributionPoints > 0 && (
					<p>Total Contribution points: {userDetails.contributionPoints}</p>
				)}
				{userDetails.reputation > 0 && (
					<p>LeetCode Reputation: {userDetails.reputation}</p>
				)}
			</div>
		)
	);
};

export default Leetcode;
