const fs = require('fs');
const joinPath = require('path').join;

const asyncReaddir = fs.promises.readdir;
const asyncStat = fs.promises.stat;

/**
 * 遍历指定的目录
 * @param {string} dir                      要遍历的目录
 * @param {(file:string)=>void} fileCb      文件回调
 * @param {((folder:string)=>void)=} pathCb 目录回调
 * @returns {Promise<void>} 无
 */
async function traversal(dir, fileCb, pathCb) {
    const root = joinPath(dir, '');
    const dirs = [root];

    while (dirs.length > 0) {
        let p = dirs.shift();
        let files = await asyncReaddir(p);
        for (let f of files) {
            f = joinPath(p, f);
            let stat = await asyncStat(f);
            if (stat.isFile()) {
                fileCb(f.replace(root, ''));
            }
            else if (stat.isDirectory()) {
                dirs.push(f);
                if (pathCb !== undefined) {
                    pathCb(f.replace(root, ''));
                }
            }
            else {
                console.error('181101150517');
            }
        }
    }
}

exports.traversal = traversal;