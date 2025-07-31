import "./App.css";
import { useState } from "react";

function App() {
	return (
		<>
			<StartResetButton />
			<LastText />
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

function LastText() {
	const [lastText, setLastText] = useState("最初の単語は、しりとりです");

	// 前回の入力をStateにセット
	const handleLastText = (text: string) => {
		setLastText(`前回の単語は、${text}です！`);
	};

	return (
		<div className="last-text">
			{lastText}
			<NewText updateText={handleLastText} />
		</div>
	);
}

function NewText({ updateText }: { updateText: (text: string) => void }) {
	const [text, setText] = useState("");

	// テキストボックスが変更されたら、State更新
	const handleTextBox = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};

	// ボタン押下でStateをコンソールに出力
	const submit = () => {
		console.log(`入力値は、${text}です！`);
		updateText(text); // 親コンポーネントの関数を呼び出す
		setText(""); // 入力後、テキストボックスを空にする
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
