/* eslint-disable no-sync */
const joinPath = require('path').join;
const fs = require('fs');

const { traversal } = require('./traversal');
const { fileProcessor } = require('./fileProcessor');

/**
 * 输入输出处理函数
 * @param {string} inp  输入路径
 * @param {string} outp 输出路径
 * @returns {void} 无
 */
function main(inp, outp) {
    const outRoot = joinPath(outp);
    const inRoot = joinPath(inp);

    traversal(
        inRoot
        , (path, stats) => {
            if (stats.isFile()) {
                fileProcessor(inRoot, outRoot, path).then((meta) => {
                    console.log(meta);
                });
            } else if (stats.isDirectory()) {
                const realPath = joinPath(outRoot, path);

                if (!fs.existsSync(realPath)) {
                    fs.mkdirSync(realPath);
                }
            }
        }
    );
}

exports.main = main;
