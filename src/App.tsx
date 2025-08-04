import "./App.css";
import { useState } from "react";

function App() {
	// スタートボタンの状態
	const [isStart, setIsStart] = useState(false);

	// 入力した単語の末尾が'ん'のとき、true
	const [nError, setNError] = useState(false);

	// 過去に使用した単語が入力されたら、ゲームを終了
	const [alreadyError, setAlreadyError] = useState(false);

	// しりとりの直前の単語
	const [lastText, setLastText] = useState("しりとり");

	// 過去に使用した単語を記録
	const [vocabBook, setVocabBook] = useState([""]);

	return (
		<>
			<StartResetButton
				isStart={isStart}
				setIsStart={setIsStart}
				setLastText={setLastText}
				setNError={setNError}
				setAlreadyError={setAlreadyError}
				vocabBook={vocabBook}
				setVocabBook={setVocabBook}
			/>
			<TextUpdate
				isStart={isStart}
				setIsStart={setIsStart}
				nError={nError}
				setNError={setNError}
				alreadyError={alreadyError}
				setAlreadyError={setAlreadyError}
				lastText={lastText}
				setLastText={setLastText}
				vocabBook={vocabBook}
				setVocabBook={setVocabBook}
			/>
		</>
	);
}

// スタートボタン
function StartResetButton({
	isStart,
	setIsStart,
	setNError,
	setAlreadyError,
	setLastText,
	vocabBook,
	setVocabBook,
}: {
	isStart: boolean;
	setIsStart: (isStart: boolean) => void;
	setNError: (nError: boolean) => void;
	setAlreadyError: (nError: boolean) => void;
	setLastText: (lastText: string) => void;
	vocabBook: string[];
	setVocabBook: (vocabBook: string[]) => void;
}) {
	// スタートボタンをクリックしたとき、isStartをtrueにする
	const startClick = () => {
		setIsStart(true);
		setNError(false);
		setAlreadyError(false);
		setLastText("しりとり"); // スタート時に初期単語をセット
		setVocabBook(["しりとり"]);
		console.debug(`start: ${vocabBook}`);
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
	alreadyError,
	setAlreadyError,
	lastText,
	setLastText,
	vocabBook,
	setVocabBook,
}: {
	isStart: boolean;
	setIsStart: (isStart: boolean) => void;
	nError: boolean;
	setNError: (nError: boolean) => void;
	alreadyError: boolean;
	setAlreadyError: (nError: boolean) => void;
	lastText: string;
	setLastText: (lastText: string) => void;
	vocabBook: string[];
	setVocabBook: (vocabBook: string[]) => void;
}) {
	// 前回の単語の末尾と入力した単語の先頭が一致しないとき、true 一致するとき、false
	const [siritoriError, setSiritoriError] = useState(false);

	// ひらがなの入力のみ受け付ける
	const [hiraganaError,setHiraganaError]=useState(false);

	return (
		<>
			{(isStart || nError || alreadyError) && (
				<div className="last-text">ひとつ前の単語は{lastText}です</div>
			)}
			{isStart && (
				<NewText
					setIsStart={setIsStart}
					setSiritoriError={setSiritoriError}
					setNError={setNError}
					setAlreadyError={setAlreadyError}
					setHiraganaError={setHiraganaError}
					lastText={lastText}
					setLastText={setLastText}
					vocabBook={vocabBook}
					setVocabBook={setVocabBook}
				/>
			)}
			{siritoriError && (
				<div className="siritori-error">
					ひとつ前の単語の末尾と入力した単語の先頭が一致しません
				</div>
			)}
			{hiraganaError && (
				<div className="n-error">
					ひらがな以外が入力されました
				</div>
			)}
			{nError && (
				<div className="n-error">
					入力した単語の末尾が'ん'でした ゲームを終了します
				</div>
			)}
			{alreadyError && (
				<div className="n-error">
					過去に使用した単語が入力されました ゲームを終了します
				</div>
			)}
		</>
	);
}

// 単語の更新
function NewText({
	setIsStart,
	setSiritoriError,
	setNError,
	setAlreadyError,
	setHiraganaError,
	lastText,
	setLastText,
	vocabBook,
	setVocabBook,
}: {
	setIsStart: (isStart: boolean) => void;
	setSiritoriError: (siritoriError: boolean) => void;
	setNError: (nError: boolean) => void;
	setAlreadyError: (nError: boolean) => void;
	setHiraganaError: (nError: boolean) => void;
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
		const regex = /^[ぁ-ん]+$/;
		if(!regex.test(newText)){
			setSiritoriError(false); // 一致したらエラーを削除
			setHiraganaError(true); // ひらがなのみが入力されたらエラーを削除
		}
		// 前回の単語の末尾と入力した単語の先頭が一致したら単語を更新
		else if (lastText.slice(-1) === newText.slice(0, 1)) {
			// 前回の入力をStateにセット
			setLastText(newText);
			setHiraganaError(false); // ひらがなのみが入力されたらエラーを削除

			// 入力した単語の末尾が'ん'のときエラーを出す
			if (newText.slice(-1) === "ん") {
				setIsStart(false);
				setNError(true);
			}

			console.debug(`update1: ${vocabBook}`);
			console.debug(`update2: ${newText}`);
			// 過去に使用した単語が入力されたら、ゲームを終了
			for (const vocabBooks of vocabBook) {
				if (vocabBooks === newText) {
					setIsStart(false);
					setAlreadyError(true);
					console.debug("update3: true");
					break;
				}
			}

			// 入力した単語を記録
			setVocabBook([...vocabBook, newText]);
		} else {
			setSiritoriError(true); // 一致しなかった場合はエラーをtrueにする
			setHiraganaError(false); // ひらがなのみが入力されたらエラーを削除
		}
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
