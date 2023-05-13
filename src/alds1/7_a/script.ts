// 螺旋本 P.188 根付き木
// https://onlinejudge.u-aizu.ac.jp/courses/lesson/1/ALDS1/7/ALDS1_7_A

export default {}; // ダミーexport

// -----------------------------------------------------------------------------

let config;

if (process.platform === "win32") {
  config = { stdin: `${__dirname}/test1.txt`, newline: "\r\n" };
} else {
  config = { stdin: "/dev/stdin", newline: "\n" };
}

type Node = {
  parent: number;
  left: number;
  right: number;
};

const NIL = -1;
const tree: Node[] = [];

const input: string = require("fs").readFileSync(config.stdin, "ascii");
const lines = input.trim().split(config.newline);

const n = Number(lines[0]);

for (let i = 0; i < n; i++) {
  tree.push({
    parent: NIL,
    left: NIL,
    right: NIL,
  });
}

for (let i = 1; i <= n; i++) {
  let l = 0;
  const line = lines[i];
  const [id, k, ...children] = line
    .trim()
    .split(" ")
    .map((v) => Number(v));

  for (let j = 0; j < k; j++) {
    const c = children[j];
    if (j === 0) {
      tree[id].left = c;
    } else {
      tree[l].right = c;
    }
    l = c;
    tree[c].parent = id;
  }
}

for (let i = 0; i < n; i++) {
  print(i);
}

function getDepth(u: number): number {
  let d = 0;
  while (tree[u].parent !== NIL) {
    u = tree[u].parent;
    d++;
  }
  return d;
}

function print(u: number) {
  process.stdout.write(`node ${u}: `);
  process.stdout.write(`parent = ${tree[u].parent}, `);
  process.stdout.write(`depth = ${getDepth(u)}, `);

  if (tree[u].parent === NIL) {
    process.stdout.write("root, ");
  } else if (tree[u].left === NIL) {
    process.stdout.write("leaf, ");
  } else {
    process.stdout.write("internal node, ");
  }

  process.stdout.write("[");

  for (let i = 0, c = tree[u].left; c != NIL; i++, c = tree[c].right) {
    if (i !== 0) {
      process.stdout.write(", ");
    }
    process.stdout.write(`${c}`);
  }

  console.log("]");
}
