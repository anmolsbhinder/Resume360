import React from "react";
import "./App.css";
// import LeetCodeSolvedCount from '../src/components/LCSolved';
import Github from "./components/Github";
import Codeforces from "./components/Codeforces";
import Leetcode from "./components/Leetcode";

const App: React.FC = () => {
	const initialUsername = "PerfectoZ"; // Replace with your initial username

	return (
		<div>
			<h1 className="demo">{initialUsername}'s Resume360</h1>
			{/* <LeetCodeSolvedCount username={initialUsername} /> */}
			<Leetcode />
			<Github username={initialUsername} />
			<Codeforces codeforcesHandle={initialUsername} />
		</div>
	);
};

export default App;
