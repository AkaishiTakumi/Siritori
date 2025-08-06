import "./App.css";
import { useState, useRef } from "react";

let flagI = 1;
const isStart: number = flagI;
flagI = flagI << 1;
const nError: number = flagI;
flagI = flagI << 1;
const alreadyError: number = flagI;
flagI = flagI << 1;
const siritoriError: number = flagI;
flagI = flagI << 1;
const hiraganaError: number = flagI;
flagI = flagI << 1;
const oneError: number = flagI;
flagI = flagI << 1;

function App() {
	// エラーフラグ
	const [errorFlag, setErrorFlag] = useState(flagI & ~flagI);

	// しりとりの直前の単語
	const [lastText, setLastText] = useState("しりとり");

	// 過去に使用した単語を記録
	const [vocabBook, setVocabBook] = useState([""]);

	return (
		<div className="main">
			<StartResetButton
				errorFlag={errorFlag}
				setErrorFlag={setErrorFlag}
				setLastText={setLastText}
				setVocabBook={setVocabBook}
			/>
			{/* 一度もスタートを押していなければ、errorFlagは0 */}
			{Boolean(errorFlag) && (
				<>
					<HorizontalScroll vocabBook={vocabBook} />
					<div className="last-text">
						ひとつ前の単語は{" "}
						<span className="last-text-word">{lastText}</span> です
					</div>
				</>
			)}
			<TextUpdate
				errorFlag={errorFlag}
				setErrorFlag={setErrorFlag}
				lastText={lastText}
				setLastText={setLastText}
				vocabBook={vocabBook}
				setVocabBook={setVocabBook}
			/>
			{Boolean(errorFlag & siritoriError) && (
				<div className="siritori-error">
					ひとつ前の単語の末尾と入力した単語の先頭が一致しません
				</div>
			)}
			{Boolean(errorFlag & hiraganaError) && (
				<div className="hiragana-error">
					ひらがな以外が入力されました
				</div>
			)}
			{Boolean(errorFlag & oneError) && (
				<div className="one-error">
					入力が一文字だけでした 文字数を増やしてください
				</div>
			)}
			{Boolean(errorFlag & nError) && (
				<div className="n-error">
					入力した単語の末尾が'ん'でした ゲームを終了します
				</div>
			)}
			{Boolean(errorFlag & alreadyError) && (
				<div className="already-error">
					過去に使用した単語が入力されました ゲームを終了します
				</div>
			)}
		</div>
	);
}

// スタートボタン
function StartResetButton({
	errorFlag,
	setErrorFlag,
	setLastText,
	setVocabBook,
}: {
	errorFlag: number;
	setErrorFlag: (errorFlag: number) => void;
	setLastText: (lastText: string) => void;
	setVocabBook: (vocabBook: string[]) => void;
}) {
	// スタートボタンをクリックしたとき、フラグをisStartにする
	const startClick = () => {
		setErrorFlag(isStart);
		setLastText("しりとり"); // 初期単語をセット
		setVocabBook(["しりとり"]);
	};

	return (
		<div className="start-reset-button" onClick={startClick}>
			{errorFlag & isStart ? "リセット" : "スタート"}
		</div>
	);
}

// しりとり 単語の更新
function TextUpdate({
	errorFlag,
	setErrorFlag,
	lastText,
	setLastText,
	vocabBook,
	setVocabBook,
}: {
	errorFlag: number;
	setErrorFlag: (errorFlag: number) => void;
	lastText: string;
	setLastText: (lastText: string) => void;
	vocabBook: string[];
	setVocabBook: (vocabBook: string[]) => void;
}) {
	return (
		<>
			{Boolean(errorFlag & isStart) && (
				<NewText
					setErrorFlag={setErrorFlag}
					lastText={lastText}
					setLastText={setLastText}
					vocabBook={vocabBook}
					setVocabBook={setVocabBook}
				/>
			)}
		</>
	);
}

// 単語の更新
function NewText({
	setErrorFlag,
	lastText,
	setLastText,
	vocabBook,
	setVocabBook,
}: {
	setErrorFlag: (errorFlag: number) => void;
	lastText: string;
	setLastText: (lastText: string) => void;
	vocabBook: string[];
	setVocabBook: (vocabBook: string[]) => void;
}) {
	// 入力した単語
	const [newText, setNewText] = useState("");

	// テキストボックスが変更されたら、State更新
	const handleTextBox = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewText(e.target.value);
	};

	// ボタン押下でStateをコンソールに出力
	const submit = () => {
		setNewText(""); // 入力後、テキストボックスを空にする

		// 過去に使用した単語が入力された
		for (const vocabBooks of vocabBook) {
			if (vocabBooks === newText) {
				setErrorFlag(alreadyError);
				return;
			}
		}

		// 入力した単語の末尾が'ん'
		if (newText.slice(-1) === "ん") {
			setErrorFlag(nError);
		}

		// 入力した単語が一文字
		else if (newText.length === 1) {
			setErrorFlag(isStart | oneError);
		}

		// ひらがな以外が入力された
		else if (!/^[ぁ-んー]+$/.test(newText)) {
			setErrorFlag(isStart | hiraganaError);
		}

		// 前回の単語の末尾と入力した単語の先頭が一致しない
		else if (lastText.slice(-1) !== newText.slice(0, 1)) {
			setErrorFlag(isStart | siritoriError);
		} else {
			setErrorFlag(isStart);
			setLastText(newText); // 単語を更新
			setVocabBook([...vocabBook, newText]); // 入力した単語を記録
		}
		setNewText(""); // 入力後、テキストボックスを空にする
	};
	// Enterキー押下でStateをコンソールに出力
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.nativeEvent.isComposing || e.key !== "Enter") return;
		submit();
	};

	return (
		<span className="new-text">
			<input
				className="new-text-box"
				type="text"
				value={newText}
				onChange={handleTextBox}
				onKeyDown={handleKeyDown}
			/>
			<button className="new-text-button" onClick={submit}>
				決定
			</button>
		</span>
	);
}

function HorizontalScroll({ vocabBook }: { vocabBook: string[] }) {
	const containerRef = useRef<HTMLDivElement>(null);

	const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		if (containerRef.current) {
			containerRef.current.scrollLeft += e.deltaY;
		}
	};

	return (
		<>
			<div className="used-words">過去に使用した単語</div>
			<div
				className="handle-wheel"
				ref={containerRef}
				onWheel={handleWheel}
			>
				{/* 横に長いコンテンツ */}
				<div className="handle-wheel-contents">
					{vocabBook.map((word, index) => (
						<span
							className="handle-wheel-contents-word"
							key={index}
						>
							{word}
						</span>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
