import "./App.css";
import { useState } from "react";

function App() {
	return (
		<>
			<StartResetButton />
			<NewText />
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

function NewText() {
	const [text, setText] = useState("");

	// テキストボックスが変更されたら、State更新
	const handleTextBox = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};

	// ボタン押下でStateをコンソールに出力
	const submit = () => {
		console.log(`入力値は、${text}です！`);
	};
	// Enterキー押下でStateをコンソールに出力
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.nativeEvent.isComposing || e.key !== "Enter") return;
		submit();
	};

	return (
		<>
			<input
				className="new-text"
				type="text"
				value={text}
				onChange={handleTextBox}
				onKeyDown={handleKeyDown}
			/>
			<button className="new-text-button" onClick={submit}>
				決定
			</button>
		</>
	);
}

export default App;
