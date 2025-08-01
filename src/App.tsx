import "./App.css";
import { useState } from "react";

function App() {
	const [isStart, setIsStart] = useState(false);
	const [lastText, setLastText] = useState("しりとり");
	return (
		<>
			<StartResetButton
				isStart={isStart}
				setIsStart={setIsStart}
				setLastText={setLastText}
			/>
			{isStart && (
				<TextUpdate lastText={lastText} setLastText={setLastText} />
			)}
		</>
	);
}

// スタートボタン
function StartResetButton({
	isStart,
	setIsStart,
	setLastText,
}: {
	isStart: boolean;
	setIsStart: (isStart: boolean) => void;
	setLastText: (lastText: string) => void;
}) {
	// スタートボタンをクリックしたとき、isStartをtrueにする
	const startClick = () => {
		setIsStart(true);
		setLastText("しりとり"); // スタート時に初期単語をセット
	};

	return (
		<div className="start-reset-button" onClick={startClick}>
			{isStart ? "リセット" : "スタート"}
		</div>
	);
}

function TextUpdate({
	lastText,
	setLastText,
}: {
	lastText: string;
	setLastText: (lastText: string) => void;
}) {
	const [siritoriError, setSiritoriError] = useState(false);

	return (
		<>
			<div className="last-text">ひとつ前の単語は{lastText}です</div>
			<NewText
				lastText={lastText}
				setLastText={setLastText}
				setSiritoriError={setSiritoriError}
			/>
			{siritoriError && (
				<div className="siritori-error">
					ひとつ前の単語の末尾と入力した単語の先頭が一致しません
				</div>
			)}
		</>
	);
}

function NewText({
	lastText,
	setLastText,
	setSiritoriError,
}: {
	lastText: string;
	setLastText: (lastText: string) => void;
	setSiritoriError: (siritoriError: boolean) => void;
}) {
	const [newText, setNewText] = useState("");

	// テキストボックスが変更されたら、State更新
	const handleTextBox = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewText(e.target.value);
	};

	// ボタン押下でStateをコンソールに出力
	const submit = () => {
		// 前回の単語の末尾と入力した単語の先頭が一致したら単語を更新
		if (lastText.slice(-1) === newText.slice(0, 1)) {
			// 前回の入力をStateにセット
			setLastText(newText);
			setSiritoriError(false); // 一致したらエラーを削除
		} else setSiritoriError(true); // 一致しなかった場合はエラーをtrueにする
		setNewText(""); // 入力後、テキストボックスを空にする
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
				value={newText}
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
