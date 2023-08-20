/* eslint-disable */
import React, { useEffect, useState } from "react";
import { getUserRating } from "../api/cfapi"; // Import your getUserRating function
import "../App.css";
import BarGraph from "../assets/BarGraph";

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
					<p>Curr Rating: {codeforcesRating.rating}</p>
					<p>Max Rating: {codeforcesRating.maxRating}</p>
					<p>
						Best Rank: {codeforcesRating.maxRank} |{" "}
						{codeforcesRating.maxcontest ? (
							<a
								href={`https://codeforces.com/contest/${codeforcesRating.maxcontest.contestId}`}
							>
								{codeforcesRating.maxcontest.contestName}
							</a>
						) : (
							"No contest information available"
						)}
					</p>
					<p>Contests: {codeforcesRating.contests.length}</p>
					<p>Problems Solved: {codeforcesRating.solvedProblems.size}</p>
					<BarGraph divisions={codeforcesRating.divisions} />
				</div>
			) : (
				<p>Error fetching Codeforces rating</p>
			)}
		</div>
	);
};

export default Codeforces;
