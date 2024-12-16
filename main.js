//Balanced Search Tree (BST)

class BSTNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }
    buildTree(arr) {
        if (!arr.length) return;
        const sortedArr = mergeSort(arr);
        deleteDuplicates(sortedArr);

        return recurse(sortedArr);

        function recurse(arr) {
            if (!arr.length) return null;
            const mid = Math.floor((arr.length - 1) / 2);
            let root = new BSTNode(arr[mid]);

            const leftSide = arr.slice(0, mid);
            const rightSide = arr.slice(mid + 1);

            root.left = recurse(leftSide);
            root.right = recurse(rightSide);

            return root;
        }
    }

    insert(value) {
        recurse(this.root);

        function recurse(node) {
            if (value < node.data) {
                if (!node.left) {
                    node.left = new BSTNode(value);
                    return;
                }
                recurse(node.left);
            } else if (value > node.data) {
                if (!node.right) {
                    node.right = new BSTNode(value);
                    return;
                }
                recurse(node.right);
            } else {
                console.log(`Value entered: ${value} \nIs either undefined or euqal to an existing node value`);
            }
        }
    }

    deleteItem(value) {
        findNode(this, this.root);

        function findNode(tree, node, nodeParent, isLeft = null) {
            if (value === node.data) {
                if (!nodeParent) {
                    if (node.left && node.right) {
                        // "Node got two childrien"
                        const nextBiggest = findNextBiggest(node.right).data;
                        tree.deleteItem(nextBiggest);
                        node.data = nextBiggest;
                    } else if (node.left) {
                        const inheritRootThrone = findSecondBiggest(node.left).data;
                        tree.deleteItem(inheritRootThrone);
                        node.data = inheritRootThrone;
                    } else if (node.right) {
                        node.data = node.right.data;
                        node.right = null;
                    } else {
                        node.data = 0;
                    }
                    return;
                } else if (isLeft) {
                    if (node.left && node.right) {
                        // "Node got two childrien"
                        const nextBiggest = findNextBiggest(node.right).data;
                        tree.deleteItem(nextBiggest);
                        node.data = nextBiggest;
                    } else if (node.left) {
                        nodeParent.left = node.left;
                    } else if (node.right) {
                        nodeParent.left = node.right;
                    } else {
                        nodeParent.left = null;
                    }
                    return;
                } else {
                    if (node.left && node.right) {
                        // "Node got two childrien"
                        const nextBiggest = findNextBiggest(node.right).data;
                        tree.deleteItem(nextBiggest);
                        node.data = nextBiggest;
                    }
                    else if (node.left) {
                        nodeParent.right = node.left;
                    } else if (node.right) {
                        nodeParent.right = node.right;
                    } else {
                        nodeParent.right = null;
                    }
                    return;
                }
            }
            if (value < node.data) {
                if (!node.left) return console.log("Node don exist");
                findNode(tree, node.left, node, true);
                return;
            } else {
                if (!node.right) return console.log("Node don exist");
                findNode(tree, node.right, node, false);
                return;
            }
        }

        function findNextBiggest(node) {
            if (!node.left) {
                return node;
            }

            return findNextBiggest(node.left);
        }

        function findSecondBiggest(node) {
            if (!node.right) {
                return node
            }

            return findSecondBiggest(node.right);
        }
    }

    levelOrder(callback) {
        const queue = [this.root];

        recurse(callback);

        function recurse(callback) {
            callback(queue[0]);
            if (queue[0].left) queue.push(queue[0].left);
            if (queue[0].right) queue.push(queue[0].right);
            queue.shift();
            if (queue.length) recurse(callback);
        }
    }
}

function deleteDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < i + 2; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                j--
            }
        }
    }
    return arr;
}

//BST testing

const exampleArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const peme = new Tree(exampleArr);

// peme.insert(4.9);
// peme.insert(4.8);
// peme.insert(4.7);
// peme.insert(4.6);
// peme.insert(4.5);
// peme.insert(4.4);

// console.log(prettyPrint(peme.root));
// while (peme.root.data) {
//     peme.deleteItem(peme.root.data);
//     console.log(prettyPrint(peme.root));
// }

prettyPrint(peme.root)

peme.levelOrder((node)=> console.log(node.data));

function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// MergeSort

function mergeSort(arr) {
    if (arr.length === 1) return arr
    let leftLength = Math.floor(arr.length / 2);
    const lefSide = arr.splice(0, leftLength);
    const rightSide = [...arr];

    const sortedLeft = mergeSort(lefSide);
    const sortedRight = mergeSort(rightSide);

    return merge(sortedLeft, sortedRight, sortedLeft.length, sortedRight.length);
}

function merge(arrLeft, arrRight, leftLength, rightLength) {
    const mergedArr = [];
    let i = 0, j = 0;

    while (i < leftLength && j < rightLength) {
        if (arrLeft[i] < arrRight[j]) {
            mergedArr.push(arrLeft[i++]);
        } else {
            mergedArr.push(arrRight[j++]);
        }
    };
    for (i; i < leftLength; i++) {
        mergedArr.push(arrLeft[i]);
    };
    for (j; j < rightLength; j++) {
        mergedArr.push(arrRight[j]);
    };
    return mergedArr
}
