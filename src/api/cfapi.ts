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

		if (userRating.length > 0) {
			const latestRating = userRating[userRating.length - 1];
			const rating = latestRating.newRating;
			const rank = latestRating.rank;
			const maxRating = userRating.reduce(
				(max, rating) => Math.max(max, rating.newRating),
				-1,
			);
			const maxRank = userRating.find(
				(rating) => rating.newRating === maxRating,
			)?.rank;

			return { rating, rank, maxRating, maxRank };
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
