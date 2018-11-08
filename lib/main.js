const { join } = require('path');

const { asyncExists, asyncMkdir } = require('./api/asyncFs');

const { traversal } = require('./traversal');
const { fileProcess } = require('./fileProcess');

/**
 * 输入输出处理函数
 * @param {string} inp  输入路径
 * @param {string} outp 输出路径
 * @returns {void} 无
 */
async function main(inp, outp) {
    const outRoot = join(outp);
    const inRoot = join(inp);

    if (!await asyncExists(outRoot)) {
        await asyncMkdir(outRoot);
    }

    traversal(
        inRoot
        , async (path, stats) => {
            if (stats.isFile()) {
                const meta = await fileProcess(outRoot, path);

                console.log(meta);
            }
            else if (stats.isDirectory()) {

                const dir = path.replace(/\w+[\/\\]/, '');
                const realPath = join(outRoot, dir);

                if (!await asyncExists(realPath)) {
                    await asyncMkdir(realPath);
                }
            }
        }
    );
}

exports.main = main;
