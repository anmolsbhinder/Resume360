import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

interface BarGraphProps {
	divisions: number[];
}

const BarGraph: React.FC<BarGraphProps> = ({ divisions }) => {
	const data = divisions.map((Problems, index) => ({
		division: String.fromCharCode(65 + index),
		Problems,
	}));

	return (
		<BarChart width={400} height={300} data={data}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="division" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="Problems" fill="steelblue" />
		</BarChart>
	);
};

export default BarGraph;
