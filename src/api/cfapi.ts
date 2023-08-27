/* eslint-disable */
import axios from "axios";

interface RatingEntry {
	contestId: number;
	contestName: string;
	handle: string;
	rank: number;
	ratingUpdateTimeSeconds: number;
	oldRating: number;
	newRating: number;
}

async function getUserRating(handle: string) {
	try {
		const response = await axios.get(
			`https://codeforces.com/api/user.rating?handle=${handle}`,
		);
		const userRating: RatingEntry[] = response.data.result;

		const submissionsResponse = await axios.get(
			`https://codeforces.com/api/user.status?handle=${handle}`,
		);
		const submissions = submissionsResponse.data.result;

		console.log(userRating);

		if (userRating.length > 0) {
			const latestRating = userRating[userRating.length - 1];
			const rating = latestRating.newRating;
			const maxRating = userRating.reduce(
				(max, rating) => Math.max(max, rating.newRating),
				-1,
			);
			const maxRank = userRating.reduce(
				(min, rating) => Math.min(min, rating.rank),
				900000,
			);
			const maxcontest = userRating.find((rating) => rating.rank === maxRank);

			const solvedProblems: Set<string> = new Set();

			submissions.forEach(
				(submission: {
					problem: { index: any; contestId: any };
					verdict: string;
				}) => {
					var pid = submission.problem.index + submission.problem.contestId;
					if (submission.verdict === "OK") solvedProblems.add(pid);
				},
			);

			const divisions = new Array();
			solvedProblems.forEach((problem) => {
				var idx = problem.charCodeAt(0) - "A".charCodeAt(0);
				divisions[idx] = (divisions[idx] || 0) + 1;
			});

			const contests = [0, ...userRating.map((entry) => entry.newRating)];

			return {
				rating,
				maxRating,
				maxRank,
				maxcontest,
				solvedProblems,
				divisions,
				contests,
			};
		} else {
			console.log("No rating information available for the user.");
			return null;
		}
	} catch (error) {
		console.error("Error fetching user rating:", error);
		return null;
	}
}

export { getUserRating };
