import React, { useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

interface Contest {
	attended: boolean;
	trendDirection: string;
	problemsSolved: number;
	totalProblems: number;
	finishTimeInSeconds: number;
	rating: number;
	ranking: number;
	contest: {
		title: string;
		startTime: number;
	};
}

interface ContestRatingGraphProps {
	userContestRankingHistory: Contest[];
}

const ContestRatingGraph: React.FC<ContestRatingGraphProps> = ({
	userContestRankingHistory,
}) => {
	const attendedContests = userContestRankingHistory.filter(
		(contest) => contest.attended,
	);
	const [selectedContest, setSelectedContest] = useState<Contest | null>(null);

	const handleContestClick = (event: any) => {
		const chartWidth = event.containerWidth;
		const activeX = event.activePayload
			? event.activePayload[0].payload.index
			: null;

		if (activeX !== null) {
			const index = Math.floor(
				(activeX / chartWidth) * attendedContests.length,
			);
			const selectedContest = attendedContests[index];
			setSelectedContest(selectedContest);
		}
	};

	const chartData = attendedContests.map((contest, index) => ({
		index,
		rating: contest.rating,
	}));

	return (
		<div>
			<h2>Contest Rating Graph</h2>
			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={chartData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="index"
						tickFormatter={(index) => `Contest ${index + 1}`}
					/>
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="rating"
						stroke="#8884d8"
						activeDot={{ r: 8 }}
						onMouseUp={handleContestClick}
					/>
				</LineChart>
			</ResponsiveContainer>
			{selectedContest && (
				<div>
					<h3>Selected Contest Details</h3>
					Date:{" "}
					{new Date(
						selectedContest.contest.startTime * 1000,
					).toLocaleString()}{" "}
					<br />
					Questions Solved: {selectedContest.problemsSolved} <br />
					Rank: {selectedContest.ranking} <br />
					New Rating: {selectedContest.rating}
				</div>
			)}
		</div>
	);
};

export default ContestRatingGraph;
