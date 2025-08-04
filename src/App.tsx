import "./App.css";
import { AddNode } from "./AVLtree";
import { StringToCharCode } from "./charCode";
import { useState } from "react";

// 二分探査木のノードを表す構造体
class NodeT {
	number: number[];
	name: string;
	left: NodeT | undefined;
	right: NodeT | undefined;

	constructor(number: number[], name: string) {
		this.number = number;
		this.name = name;
		this.left = undefined;
		this.right = undefined;
	}
}

// AddNodeの簡略
function AddNodeString({
	root,
	name,
	setRoot,
}: {
	root: NodeT | undefined;
	name: string;
	setRoot: (root: NodeT | undefined) => void;
}) {
	setRoot(AddNode(root, StringToCharCode(name), name));
}

// rootを根ノードとする二分探索木をの全ノードを表示する
function PrintTree(root: NodeT | undefined, depth: number) {
	if (root === undefined) return;

	// 右の子孫ノードを表示
	PrintTree(root.right, depth + 1);

	let printStr: string = "";
	//深さをスペースで表現
	for (let i = 0; i < depth; i++) printStr += " ";

	// ノードのデータを表示
	console.log(`${printStr}+${root.number}(${root.name})`);

	// 左の子孫ノードを表示
	PrintTree(root.left, depth + 1);

	depth++;
}

function App() {
	// スタートボタンの状態
	const [isStart, setIsStart] = useState(false);

	// 入力した単語の末尾が'ん'のとき、true
	const [nError, setNError] = useState(false);

	// しりとりの直前の単語
	const [lastText, setLastText] = useState("しりとり");

	console.log(`NewNode(${lastText})`);
	const [vocabBook, setVocabBook] = useState(
		new NodeT(StringToCharCode(lastText), lastText)
	);
	PrintTree(vocabBook, 0);

	return (
		<>
			<StartResetButton
				isStart={isStart}
				setIsStart={setIsStart}
				setLastText={setLastText}
				setNError={setNError}
				vocabBook={vocabBook}
				setVocabBook={setVocabBook}
			/>
			<TextUpdate
				isStart={isStart}
				setIsStart={setIsStart}
				nError={nError}
				setNError={setNError}
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
	setLastText,
	vocabBook,
	setVocabBook,
}: {
	isStart: boolean;
	setIsStart: (isStart: boolean) => void;
	setNError: (nError: boolean) => void;
	setLastText: (lastText: string) => void;
	vocabBook: NodeT;
	setVocabBook: (vocabBook: NodeT) => void;
}) {
	// スタートボタンをクリックしたとき、isStartをtrueにする
	const startClick = () => {
		setIsStart(true);
		setNError(false);
		setLastText("しりとり"); // スタート時に初期単語をセット
		/** debug￥￥￥ */
		const Vtmp = "";
		AddNode(vocabBook, StringToCharCode(Vtmp), Vtmp);

		/** debug^^^^^ */
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
	vocabBook,
	setVocabBook,
}: {
	isStart: boolean;
	setIsStart: (isStart: boolean) => void;
	nError: boolean;
	setNError: (nError: boolean) => void;
	lastText: string;
	setLastText: (lastText: string) => void;
	vocabBook: NodeT;
	setVocabBook: (vocabBook: NodeT) => void;
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
					vocabBook={vocabBook}
					setVocabBook={setVocabBook}
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
	setSiritoriError,
	setNError,
	lastText,
	setLastText,
	vocabBook,
	setVocabBook,
}: {
	setIsStart: (isStart: boolean) => void;
	setSiritoriError: (siritoriError: boolean) => void;
	setNError: (nError: boolean) => void;
	lastText: string;
	setLastText: (lastText: string) => void;
	vocabBook: NodeT;
	setVocabBook: (vocabBook: NodeT) => void;
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

			// 入力した単語を記録
			console.debug("vocabBook.dir");
			console.dir(vocabBook);
			console.log(`AddNode(${newText})`);
			AddNode(vocabBook, StringToCharCode(newText), newText);
			PrintTree(vocabBook, 0);
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
