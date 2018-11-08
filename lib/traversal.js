// eslint-disable-next-line no-unused-vars
const { stat, readdir, Stats } = require('fs');
const { join } = require('path');

/**
 * 实际遍历函数
 * @param {string[]}     paths        路径的回调
 * @param {pathCallback} callback     文件的回调
 * @param {Function}     resolve      继续
 * @param {Function}     reject       拒绝      
 * @returns {void} void
 */
function trav(paths, callback, resolve, reject) {
    if (paths.length === 0) {
        resolve();

        return;
    }

    const path = paths.pop();

    stat(path, (err, stats) => {
        if (err !== null) {
            reject(err);

            return;
        }

        new Promise(
            (res, _rej) => {
                if (!stats.isDirectory()) {
                    res(path, stats);

                    return;
                }
                readdir(path, (e, files) => {
                    if (e !== null) {
                        reject(e);

                        return;
                    }
                    for (const f of files) {
                        paths.push(join(path, f));
                    }
                    res(path, stats);
                });
            })
            .then(() => callback(path, stats))
            .then(() => {
                trav(paths, callback, resolve, reject);
            });
    });
}

/**
 * 遍历文件
 * @param {(string|string[])} path     路径
 * @param {pathCallback}      callback 文件/路径回调
 * @returns {Promise<void>} promise<void>
 */
function traversal(path, callback) {
    const paths = typeof path === 'string'
        ? [path]
        : path;

    return new Promise((resolve, reject) => {
        trav(paths, callback, resolve, reject);
    });
}

module.exports = { traversal };

/** 
 * @callback pathCallback
 * @param {string} path  文件的路径
 * @param {Stats}  stats 文件状态
 * @returns {Promise<path,stats>} Promise<path,stats>
 */
