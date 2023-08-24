// leetcodeAPI.ts

import axios from "axios";

const leetCodeGraphqlQuery = `
  query GetLeetCodeUserContestInfo($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
    }
    userContestRankingHistory(username: $username) {
      attended
      trendDirection
      problemsSolved
      totalProblems
      finishTimeInSeconds
      rating
      ranking
      contest {
        title
        startTime
      }
    }
  }
`;

export async function leetcodeContest(username: string) {
	try {
		const response = await axios.post(
			"http://localhost:3001/proxy-leetcode",
			{
				query: leetCodeGraphqlQuery,
				variables: { username },
			},
			{
				headers: {
					"Content-Type": "application/json",
					"User-Agent": "Your User Agent Here",
				},
			},
		);

		return response.data.data;
	} catch (error) {
		throw new Error("Error fetching LeetCode user contest info");
	}
}
