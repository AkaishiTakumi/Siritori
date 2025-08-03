const TREE_LEFT: number = 1;
const TREE_RIGHT: number = 2;

// 二分探査木のノードを表す構造体
class NodeT {
	number: number;
	name: string;
	left: NodeT | undefined;
	right: NodeT | undefined;

	constructor(number: number, name: string) {
		this.number = number;
		this.name = name;
		this.left = undefined;
		this.right = undefined;
	}
}

// nodeを根とした木の高さを計算
function GetHeight(node: NodeT | undefined): number {
	if (node === undefined) return 0;
	return Math.max(GetHeight(node.left), GetHeight(node.right)) + 1;
}

//nodeを根とする部分木を回転（左）
function LeftRotate(
	root: NodeT,
	node: NodeT,
	parent: NodeT | undefined,
	direction: number
) {
	// 新しい根とするノードをpivotとして設定
	const pivot: NodeT | undefined = node.right;

	let newRoot: NodeT | undefined;

	console.log(`LeftRotate:${node.number}`);

	// 左回転
	if (pivot !== undefined) {
		node.right = node.left;
		node.left = node;
	}

	// parentもしくはrootに新しい根ノードを参照させる
	if (parent === undefined) {
		newRoot = pivot;
		return newRoot;
	}

	// どちらの子に設定するかはdirectionから判断
	if (direction === TREE_LEFT) parent.left = node;
	else parent.right = pivot;
	return root;
}

// nodeを根とする部分木を回転（右）
function RightRotate(
	root: NodeT,
	node: NodeT,
	parent: NodeT | undefined,
	direction: number
) {
	// 新しい根とするノードをpivotとして設定
	const pivot: NodeT | undefined = node.left;

	let newRoot: NodeT | undefined;

	console.log(`RightRotate:${node.number}`);

	// 左回転
	if (pivot !== undefined) {
		node.left = node.right;
		node.right = node;
	}

	// parentもしくはrootに新しい根ノードを参照させる
	if (parent === undefined) {
		newRoot = pivot;
		return newRoot;
	}

	// どちらの子に設定するかはdirectionから判断
	if (direction === TREE_LEFT) parent.left = node;
	else parent.right = pivot;
	return root;
}

// nodeを根とする部分木を二重回転（右->左）
function RightLeftRotate(
	root: NodeT,
	node: NodeT,
	parent: NodeT | undefined,
	direction: number
) {
	let newRoot: NodeT | undefined;

	console.log(`RightLeftRotate:${node.number}`);

	if (node.right === undefined) {
		throw new Error("Error: RightLeftRotate: node.right === undefined");
	}

	// nodeの右の子ノードを根として右回転
	newRoot = RightRotate(root, node.right, node, TREE_RIGHT);

	if (newRoot === undefined) {
		throw new Error("Error: RightLeftRotate: newRoot === undefined");
	}

	// nodeを根として左回転
	return LeftRotate(newRoot, node, parent, direction);
}

// nodeを根とする部分木を二重回転（左->右）
function LeftRightRotate(
	root: NodeT,
	node: NodeT,
	parent: NodeT | undefined,
	direction: number
) {
	let newRoot: NodeT | undefined;

	console.log(`LeftRightRotate:${node.number}`);

	if (node.left === undefined) {
		throw new Error("Error: LeftRightRotate: node.left === undefined");
	}

	// nodeの左の子ノードを根として左回転
	newRoot = RightRotate(root, node.left, node, TREE_LEFT);

	if (newRoot === undefined) {
		throw new Error("Error: LeftRightRotate: newRoot === undefined");
	}

	// nodeを根として右回転
	return RightRotate(newRoot, node, parent, direction);
}

// nodeからbranchで辿ったノードを平衡にする
function Balancing(
	root: NodeT | undefined,
	node: NodeT | undefined,
	parent: NodeT | undefined,
	direction: number,
	branch: number[],
	numBranch: number
): NodeT | undefined {
	let next: NodeT | undefined;
	let newRoot: NodeT | undefined;

	let leftHeight: number;
	let rightHeight: number;
	let balance: number;

	if (node === undefined || root === undefined) return root;

	// 辿れる場合はまず目的のノードまで辿る
	if (numBranch > 0) {
		/* 辿る子ノードを設定 */
		if (branch[0] === TREE_LEFT) next = node.left;
		else next = node.right;

		/* 子ノードを辿る */
		newRoot = Balancing(
			root,
			next,
			node,
			branch[0],
			branch.slice(1),
			numBranch - 1
		);

		// 平衡係数を計算
		leftHeight = GetHeight(node.left);
		rightHeight = GetHeight(node.right);
		balance = rightHeight - leftHeight;

		// 右の部分木が高くて平衡状態でない場合
		if (balance > 1) {
			if (node.right === undefined) {
				throw new Error("Error: Balancing: node.right === undefined");
			}

			if (newRoot === undefined) {
				throw new Error("Error: Balancing: newRoot === undefined");
			}

			// 2重回転が必要かどうかを判断
			if (GetHeight(node.right.left) > GetHeight(node.right.right))
				// 2重回転（Right Left Case）
				return RightLeftRotate(newRoot, node, parent, direction);
			// 1重回転（左回転）
			else return LeftRotate(newRoot, node, parent, direction);
		}
		// 左の部分木が高くて平衡状態でない場合
		else if (balance < -1) {
			if (node.left === undefined) {
				throw new Error("Error: Balancing: node.left === undefined");
			}

			if (newRoot === undefined) {
				throw new Error("Error: Balancing: newRoot === undefined");
			}

			// 2重回転が必要かどうかを判断
			if (GetHeight(node.left.left) > GetHeight(node.left.right))
				// 2重回転（Left Right Case）
				return LeftRightRotate(newRoot, node, parent, direction);
			// 1重回転（右回転）
			else return RightRotate(newRoot, node, parent, direction);
		}
	}
	return root;
}

// 二分探索木のノード全てを削除する
function DeleteTree(root: NodeT | undefined) {
	if (root === undefined) {
		return;
	}
	if (root.left !== undefined) {
		DeleteTree(root.left);
	}
	if (root.right !== undefined) {
		DeleteTree(root.right);
	}

	console.log(`free:${root.number}(${root.name})`);
	root = undefined;
}

// 指定されたnumberとname持つノードを追加する
function AddNode(root: NodeT | undefined, number: number, name: string) {
	let node: NodeT;
	const branch: number[] = [0];
	let numBranch: number = 0;

	// まだノードが一つもない場合
	if (root === undefined) {
		// 根ノードとしてノードを追加
		root = new NodeT(number, name);

		if (root === undefined) {
			throw new Error("Error: AddNode: newRoot === undefined");
		}

		return root;
	}

	// 根ノードから順に追加する場所を探索
	node = root;
	while (1) {
		// 追加する値がノードの値よりも小さい場合
		if (number < node.number) {
			// そのノードの左の子が無い場合（もう辿るべきノードが無い場合）
			if (node.left === undefined) {
				// その左の子の位置にノードを追加
				node.left = new NodeT(number, name);

				// 追加完了したので処理終了
				break;
			}
			// 左ノードを辿ったことを覚えておく
			branch[numBranch++] = TREE_LEFT;

			// 左の子がある場合は左の子を新たな注目ノードに設定
			node = node.left;
		}
		// 追加する値がノードの値よりも大きい場合
		else if (number > node.number) {
			// そのノードの右の子が無い場合（もう辿るべきノードが無い場合）
			if (node.right === undefined) {
				// その右の子の位置にノードを追加
				node.right = new NodeT(number, name);

				// 追加完了したので処理終了
				break;
			}
			// 右ノードを辿ったことを覚えておく
			branch[numBranch++] = TREE_RIGHT;

			// 右の子がある場合は右の子を新たな注目ノードに設定
			node = node.right;
		}
		// 追加する値とノードの値が同じ場合
		else {
			console.error(`${number} already exist`);
			break;
		}
	}
	return Balancing(root, root, undefined, 0, branch, numBranch);
}

// 指定されたnumberを持つノードを探索する
function SearchNode(root: NodeT | undefined, number: number) {
	let node: NodeT | undefined = root;

	// 探索を行うループ（注目ノードがNULLになったら終了）
	while (node) {
		// 探索値がノードの値よりも小さい場合
		if (number < node.number)
			// 注目ノードを左の子ノードに設定
			node = node.left;
		// 探索値がノードの値よりも大きい場合
		else if (number > node.number)
			// 注目ノードを右の子ノードに設定
			node = node.right;
		// 探索値 = ノードの値の場合
		else return node;
	}
	return undefined;
}

// 指定された 子の無いノードを削除する
function DeleteNoChildNode(
	root: NodeT | undefined,
	node: NodeT | undefined,
	parent: NodeT | undefined
) {
	// 親がいる場合（根ノード以外の場合）は
	// 削除対象ノードを指すポインタをundefinedに設定
	if (parent !== undefined) {
		// 削除対象ノードが親ノードから見て左の子の場合
		if (parent.left === node) parent.left = undefined;
		// 削除対象ノードが親ノードから見て右の子の場合
		else parent.right = undefined;
	}
	// 削除対象ノードが根ノードの場合
	// 根ノードを指すポインタをundefinedに設定
	else {
		node = undefined;
		root = undefined;
	}
	return root;
}

// 指定された子が一つのノードを削除する
function DeleteOneChildNode(
	root: NodeT | undefined,
	node: NodeT,
	child: NodeT | undefined
) {
	if (child === undefined) {
		throw new Error("Error: DeleteOneChildNode: child === undefined");
	}

	node.number = child.number;
	node.name = child.name;
	node.left = child.left;
	node.right = child.right;
	child = undefined;
	return root;
}

// 指定された 子が二つのノードを削除する
function DeleteTwoChildNode(
	root: NodeT | undefined,
	node: NodeT,
	branch: number[],
	numBranch: number
) {
	if (node.left === undefined) {
		throw new Error("Error: DeleteTwoChildNode: node.left === undefined");
	}

	// 左の子から一番大きい値を持つノードを探索
	let max: NodeT = node.left;
	let maxParent: NodeT = node;

	// 左の子ノードを辿ったことを覚えておく
	branch[numBranch++] = TREE_LEFT;

	while (max.right !== undefined) {
		maxParent = max;
		max = max.right;

		// 右の子ノードを辿ったことを覚えておく
		branch[numBranch++] = TREE_RIGHT;
	}
	console.log(`max number is ${max.number}`);

	// 最大ノードのデータのみ削除対象ノードにコピー
	node.number = max.number;
	node.name = max.name;

	// 最大ノードを削除

	// maxは最大ノードなので必ずmax->rightはNULLになる
	// 最大ノードに子がいない場合
	if (max.left === undefined) root = DeleteNoChildNode(root, max, maxParent);
	// 最大ノードに子供が一ついる場合
	else root = DeleteOneChildNode(root, max, max.left);

	return root;
}

// 指定されたnumberを持つノードを削除する
function DeleteNode(root: NodeT | undefined, number: number) {
	if (root === undefined) return undefined;

	// 削除対象ノードを指すノードを探索
	let node: NodeT | undefined = root;
	let parent: NodeT | undefined = undefined;

	const branch: number[] = [0];
	let numBranch: number = 0;

	while (node !== undefined) {
		if (number < node.number) {
			parent = node;
			node = node.left;

			// 左の子ノードを辿ったことを覚えておく
			branch[numBranch++] = TREE_LEFT;
		} else if (number > node.number) {
			parent = node;
			node = node.right;

			// 右の子ノードを辿ったことを覚えておく
			branch[numBranch++] = TREE_RIGHT;
		} else break;
	}

	// 指定されたnumberを値として持つノードが存在しない場合は何もせず終了
	if (node === undefined) {
		console.error(`Node with ${number} not exist`);
		return root;
	}

	console.log(`Delete ${node.number}(${node.name})`);

	// 子がいないノードの削除
	if (node.left === undefined && node.right === undefined)
		root = DeleteNoChildNode(root, node, parent);
	// 子が一つしかない場合
	else if (
		(node.left !== undefined && node.right === undefined) ||
		(node.right !== undefined && node.left === undefined)
	) {
		if(node.left!==undefined)root=DeleteOneChildNode(root,node,node.left);
		else root=DeleteOneChildNode(root,node,node.right);
	}
	// 左の子と右の子両方がいるノードの削除
	else root=DeleteTwoChildNode(root,node,branch,numBranch);

	return Balancing(root,root,undefined,0,branch,numBranch);
}

// rootを根ノードとする二分探索木をの全ノードを表示する
function PrintTree(root:NodeT|undefined,depth:number){
	if(root===undefined)return;

	// 右の子孫ノードを表示
	PrintTree(root.right,depth+1);

	for(let i=0;i<depth;i++)console.log(" ");

	// ノードのデータを表示
	console.log(`+${String(root.number).padStart(3, '0')}(${root.name})`);

	// 左の子孫ノードを表示
	PrintTree(root.left,depth+1);

	depth++;
}