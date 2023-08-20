import React from "react";

import Leetcode from "./components/Leetcode/Leetcode";
import Github from "./components/Github";
import Codeforces from "./components/Codeforces";

import "./App.css";

const App: React.FC = () => {
	const initialUsername = "heikrana"; // Replace with your initial username

	return (
		<div>
			<h1 className="demo">{initialUsername}'s Resume360</h1>
			<Leetcode />
			<Github username={initialUsername} />
			<Codeforces codeforcesHandle={initialUsername} />
		</div>
	);
};

export default App;
