import "./App.css";
import { useState } from "react";

function App() {
	return (
		<>
			<StartResetButton />
		</>
	);
}

// スタートボタン
function StartResetButton() {
	const [isStart, setIsStart] = useState(false);

	// スタートボタンをクリックしたとき、isStartをtrueにする
	const startClick = () => {
		setIsStart(true);
	};

	return (
		<span className="start-reset-button" onClick={startClick}>
			{isStart ? "リセット" : "スタート"}
		</span>
	);
}

export default App;
