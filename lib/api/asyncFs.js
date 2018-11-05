const { stat, readdir, readFile, Stats } = require('fs');

/**
 * 获取文件状态  
 * async stat
 * @param {string} path 路径
 * @returns {Promise<Stats>} 文件状态
 * @throws {Error} 所有 fs.stat 可能抛出的错误
 */
const asyncStat = async (path) => new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
        if (err === null) {
            resolve(stats);

            return;
        }
        reject(new Error(err));
    });
});

/**
 * 读取路径
 * @param {string} path   路径
 * @param {string} bufferEncoding 编码方式
 * @returns {Promise<string[]>} 文件的数组
 * @throws {Error} fs.readdir 可能抛出的任何错误
 */
const asyncReaddir = async (path) => new Promise((resolve, reject) => {
    readdir(path, 'utf8', (err, files) => {
        if (err === null) {
            resolve(files);

            return;
        }

        reject(new Error(err));
    });
});

/**
 * 使用 utf8 编码读取文件
 * @param {string} path 文件路径
 * @returns {Promise<string>} 文件内容
 * @throws {Error} fs.readFile 错误
 */
const asyncReadFile = async (path) => new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
        if (err === null) {
            resolve(data);

            return;
        }

        reject(new Error(err));
    });
});

module.exports = {
    asyncReadFile
    , asyncReaddir
    , asyncStat
};
