import React, { useEffect, useState } from "react";
import { getUserRating } from "../api/cfapi"; // Import your getUserRating function

interface CodeforcesRatingComponentProps {
	codeforcesHandle: string;
}

const Codeforces: React.FC<CodeforcesRatingComponentProps> = ({
	codeforcesHandle,
}) => {
	const [codeforcesRating, setCodeforcesRating] = useState<any | null>(null);

	useEffect(() => {
		getUserRating(codeforcesHandle)
			.then((ratingData) => setCodeforcesRating(ratingData))
			.catch((error) => {
				console.error("Error fetching Codeforces rating:", error);
				setCodeforcesRating(null);
			});
	}, [codeforcesHandle]);

	return (
		<div>
			{codeforcesRating ? (
				<div>
					<h2 className="demo2">Codeforces</h2>
					<h2>Codeforces Rating</h2>
					<p>Rating: {codeforcesRating.rating}</p>
					<p>Rank: {codeforcesRating.rank}</p>
					<p>Max Rating: {codeforcesRating.maxRating}</p>
					<p>Max Rank: {codeforcesRating.maxRank}</p>
				</div>
			) : (
				<p>Error fetching Codeforces rating</p>
			)}
		</div>
	);
};

export default Codeforces;
