import axios from "axios";

async function getContributions(token: string, username: string) {
	const headers = {
		Authorization: `bearer ${token}`,
	};

	const body = {
		query: `query {
      user(login: "${username}") {
        name
        contributionsCollection {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }`,
	};

	const response = await axios.post("https://api.github.com/graphql", body, {
		headers,
	});
	return response.data.data;
}

export { getContributions };
