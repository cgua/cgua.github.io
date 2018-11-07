const { exists, mkdir, stat, readdir, readFile, Stats, writeFile } = require('fs');

/**
 * 文件是否存在
 * @param {string} path   文件路径
 * @returns {Promise<boolean>} 文件是否存在
 */
const asyncExists = async (path) => new Promise((resolve) => {
    exists(path, (isExists) => {
        resolve(isExists);
    });
});


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


/**
 * 导步写入文件
 * @param {string} path 写入的路径
 * @param {any} data    要写入的数据
 * @returns {Promise<void>} promise<void>
 */
async function asyncWriteFile(path, data) {
    return new Promise((res, rej) => {
        writeFile(path, data, { encoding: 'utf8' }, (err) => {
            if (err !== null) {
                rej(err);

                return;
            }
            res();
        });
    });
}

/**
 * 以 0x777 模式创建文件夹
 * @param {string} path 路径
 * @returns {Promise<void>} promise<void>
 */
async function asyncMkdir(path) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-magic-numbers
        mkdir(path, 0x777, (err) => {
            if (err === null) {
                resolve();
            }
            else {
                reject(err);
            }
        });
    });
}

module.exports = {
    asyncExists
    , asyncMkdir
    , asyncReadFile
    , asyncReaddir
    , asyncStat
    , asyncWriteFile
};
