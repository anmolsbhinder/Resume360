import React, { useState } from "react";
import "./App.css";
// import LeetCodeSolvedCount from '../src/components/LCSolved';
import GitHubUserInfo from "../src/components/GitHubUserInfo";

const App: React.FC = () => {
	const initialUsername = "anmolsbhinder"; // Replace with your initial username

	return (
		<div>
			<h1 className="demo">{initialUsername}'s Resume360</h1>
			{/* <LeetCodeSolvedCount username={initialUsername} /> */}
			<GitHubUserInfo username={initialUsername} />
		</div>
	);
};

export default App;
