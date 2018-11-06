const { stat, readdir, Stats } = require('fs');
const { join } = require('path');

/**
 * 最大堆栈深度
 */
const maxStack = 10;

/**
 * 实际遍历函数
 * @param {string[]} paths        路径的回调
 * @param {pathCallback} callback 文件的回调
 * @param {Function} resolve      继续
 * @param {Function} reject       拒绝      
 * @param {number}   stack        栈深
 * @returns {void} void
 */
function trav(paths, callback, resolve, reject, stack) {
    if (paths.length === 0) {
        resolve();

        return;
    }

    if (stack > maxStack) { // 清栈以防溢出
        setTimeout(() => {
            trav(paths, callback, resolve, reject, 0);
        }, 0);

        return;
    }

    const path = paths.pop();

    stat(path, (err, stats) => {
        if (err !== null) {
            reject(err);

            return;
        }

        callback(path, stats);

        if (stats.isDirectory()) {
            readdir(path, (e, files) => {
                if (e !== null) {
                    reject(e);

                    return;
                }
                for (const f of files) {
                    paths.push(join(path, f));
                }
                trav(paths, callback, resolve, reject, stack + 1);
            });
        } else {
            trav(paths, callback, resolve, reject, stack + 1);
        }
    });
}

/**
 * 遍历文件
 * @param {(string|string[])} path 路径
 * @param {pathCallback} callback  文件/路径回调
 * @returns {Promise<void>} promise<void>
 */
function traversal(path, callback) {
    const paths = typeof path === 'string'
        ? [path]
        : path;

    return new Promise((resolve, reject) => {
        trav(paths, callback, resolve, reject, 0);
    });
}

module.exports = { traversal };

/** 
 * @callback pathCallback
 * @param {string} path 文件的路径
 * @param {Stats}  stats 文件状态
 * @returns {void} void
 */
