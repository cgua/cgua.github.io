/* eslint-disable no-sync */
const joinPath = require('path').join;
const fs = require('fs');

const { traversal } = require('./pathTraversal');
const { fileProcessor } = require('./fileProcessor');

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
            // todo: unuse
            // eslint-disable-next-line no-unused-vars
            fileProcessor('./md', file).then((meta) => {
                console.log(meta);
            });
        }
        , (path) => {
            const realPath = joinPath(outRoot, path);

            if (!fs.existsSync(realPath)) {
                fs.mkdirSync(realPath);
            }
        }
    );
}

exports.main = main;
