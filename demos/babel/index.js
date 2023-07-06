const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser');

const code = fs.readFileSync(path.resolve(__dirname, './code.js'), {
  encoding: 'utf-8',
});

const ast = parser.parse(code);
console.log('code', code, ast);

let depth = 0;
traverse(ast, {
  enter(path) {
    console.log(`enter ${path.type}(${path.key}) ${depth}`);
    depth++;
  },
  exit(path) {
    depth--;
    console.log(`  exit ${path.type}(${path.key}) ${depth}`);
  },
});
