const joinPath = require('path').join;
const fs = require('fs');

const traversal = require('./pathTraversal').traversal;
const fileProcessor = require('./fileProcessor').fileProcessor;

/**
 * 输入输出处理函数
 * @param {string} inp  输入路径
 * @param {string} outp 输出路径
 * @returns {void} 无
 */
function main(inp, outp) {
    const outRoot = joinPath(outp, '');
    const inRoot = joinPath(inp);
    traversal(
        inRoot
        , (file) => {
            let meta = fileProcessor('./md', file);
        }
        , (path) => {
            const p = joinPath(outRoot, path);
            if (!fs.existsSync(p)) {
                fs.mkdirSync(p);
            }
        }
    );
}

exports.main = main;