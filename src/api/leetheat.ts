// leetcodeAPI.ts

import axios from "axios";

const proxyServerUrl = "http://localhost:3001/proxy-endpoint";

async function getLeetCodeInfo(username: string) {
	const query = `
    {
      userContestRanking(username: "${username}") {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
      }
      userContestRankingHistory(username: "${username}") {
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

	const requestData = {
		targetUrl: "https://leetcode.com/graphql",
		requestData: { query },
	};

	const response = await axios.post(proxyServerUrl, requestData);
	// const response = await axios.post('https://leetcode.com/graphql');

	return response.data.data;
}

export async function leetcodeContest(username: string) {
	try {
		// const username = 'anmolsbhinder';
		const leetCodeInfo = await getLeetCodeInfo(username);
		console.log(leetCodeInfo);
		return leetCodeInfo;
	} catch (error) {
		console.error("Error fetching LeetCode information:");
	}
}
