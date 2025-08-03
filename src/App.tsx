import "./App.css";
import "./AVLtree.ts";
import { useState } from "react";

function App() {
	// スタートボタンの状態
	const [isStart, setIsStart] = useState(false);

	// 入力した単語の末尾が'ん'のとき、true
	const [nError, setNError] = useState(false);

	// しりとりの直前の単語
	const [lastText, setLastText] = useState("しりとり");

	return (
		<>
			<StartResetButton
				isStart={isStart}
				setIsStart={setIsStart}
				setLastText={setLastText}
				setNError={setNError}
			/>
			<TextUpdate
				isStart={isStart}
				setIsStart={setIsStart}
				nError={nError}
				setNError={setNError}
				lastText={lastText}
				setLastText={setLastText}
			/>
		</>
	);
}

// スタートボタン
function StartResetButton({
	isStart,
	setIsStart,
	setNError,
	setLastText,
}: {
	isStart: boolean;
	setIsStart: (isStart: boolean) => void;
	setNError: (nError: boolean) => void;
	setLastText: (lastText: string) => void;
}) {
	// スタートボタンをクリックしたとき、isStartをtrueにする
	const startClick = () => {
		setIsStart(true);
		setNError(false);
		setLastText("しりとり"); // スタート時に初期単語をセット
	};

	return (
		<div className="start-reset-button" onClick={startClick}>
			{isStart ? "リセット" : "スタート"}
		</div>
	);
}

// しりとり 単語の更新
function TextUpdate({
	isStart,
	setIsStart,
	nError,
	setNError,
	lastText,
	setLastText,
}: {
	isStart: boolean;
	setIsStart: (isStart: boolean) => void;
	nError: boolean;
	setNError: (nError: boolean) => void;
	lastText: string;
	setLastText: (lastText: string) => void;
}) {
	// 前回の単語の末尾と入力した単語の先頭が一致しないとき、true 一致するとき、false
	const [siritoriError, setSiritoriError] = useState(false);

	return (
		<>
			{(isStart || nError) && (
				<div className="last-text">ひとつ前の単語は{lastText}です</div>
			)}
			{isStart && (
				<NewText
					setIsStart={setIsStart}
					lastText={lastText}
					setLastText={setLastText}
					setSiritoriError={setSiritoriError}
					setNError={setNError}
				/>
			)}
			{siritoriError && (
				<div className="siritori-error">
					ひとつ前の単語の末尾と入力した単語の先頭が一致しません
				</div>
			)}
			{nError && (
				<div className="n-error">
					入力した単語の末尾が'ん'でした ゲームを終了します
				</div>
			)}
		</>
	);
}

// 単語の更新
function NewText({
	setIsStart,
	lastText,
	setLastText,
	setSiritoriError,
	setNError,
}: {
	setIsStart: (isStart: boolean) => void;
	lastText: string;
	setLastText: (lastText: string) => void;
	setSiritoriError: (siritoriError: boolean) => void;
	setNError: (nError: boolean) => void;
}) {
	// 入力した単語
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

			// 入力した単語の末尾が'ん'のときエラーを出す
			if (newText.slice(-1) === "ん") {
				setIsStart(false);
				setNError(true);
			}
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
