// src/LeetCodeSolvedCount.tsx
import React, { useEffect, useState } from "react";
import { fetchLeetCodeSolvedCount } from "../api/leetcode.ts";

interface LeetCodeSolvedCountProps {
	username: string;
}

const LeetCodeSolvedCount: React.FC<LeetCodeSolvedCountProps> = ({
	username,
}) => {
	const [solvedCount, setSolvedCount] = useState<number | null>(null);

	useEffect(() => {
		fetchLeetCodeSolvedCount(username)
			.then((count) => setSolvedCount(count))
			.catch((error) => {
				console.error("Error fetching LeetCode solved count:", error);
				setSolvedCount(null);
			});
	}, [username]);

	return (
		<div>
			{solvedCount !== null ? (
				<p>
					LeetCode Questions Solved by {username}: {solvedCount}
				</p>
			) : (
				<p>Error fetching solved count</p>
			)}
		</div>
	);
};

export default LeetCodeSolvedCount;
