const marked = require('marked');
const fs = require('fs');
const path = require('path');

const asyncReadFile = fs.promises.readFile;
const asyncWriteFile = fs.promises.writeFile;
const joinPath = path.join;

/**
 * 对文件进行处理，并获取文件信息
 * @param {string} root 起始目录
 * @param {string} file 相对于起始目录的根目录
 * @return {Promise<Map<string,string>>} 文件的相关信息
 */
async function fileProcessor(root, file) {
    const outRoot = './_pub';
    const filePath = joinPath(root, file);
    const outPath = joinPath(outRoot, file)
        .replace(/\.md$/, '.html');

    const utf8 = { encoding: 'utf8' };

    const txt = await asyncReadFile(filePath, utf8);

    // @ts-ignore
    const meta = getHead(txt);

    let mark = marked(txt);

    let temple = await asyncReadFile('./res/temple/index.html', utf8);
    temple = temple
        // @ts-ignore
        .replace('$title$', 'sinopia')
        .replace('$markdown$', mark);

    await asyncWriteFile(outPath, temple, utf8);

    return meta;
}

/**
 * 从 markdown 中获取头部信息
 * @param {string} fileContent 要解析的字符串
 * @return {Map<string,string>} 取得的头部信息
 */
function getHead(fileContent) {

    let map = new Map();
    let headReg = new RegExp('^\\s*\\<\\!\\-{2,}[\\s\\S]+\\-{2,}\\>');
    let head = fileContent.match(headReg);
    if (head !== undefined) {
        let lr = genReadLine(head[0]);
        while (true) {
            let next = lr.next();
            if (next.done) {
                break;
            }
            const [k, v] = splitKVPair(next.value);
            if (k !== undefined) {
                map.set(k, v);
            }
        }
    }
    if (map.has('title')) {
        return map;
    }

    let titleReg = new RegExp('\\n\\s*#\\s+(.+)');
    let title = fileContent.match(titleReg);
    (title !== undefined && title.length === 2) && (map.set('title', title[1]));
    return map;
}

/**
 * 将字符串分割成两串
 * @param {string} str      要分割的字符串
 * @param {string} spliter  分割符
 * @return {([string,string] | undefined)} 分割之后的键值对
 */
function splitKVPair(str, spliter = ':') {
    let pos = str.indexOf(spliter);
    if (pos <= 0) {
        return [undefined, undefined];
    }
    let k = str.slice(0, pos);
    let v = str.slice(pos + 1);
    return [k.trim(), v.trim()];
}

/**
 * 读取一行
 * @param {string} str 要读取的字符串
 * @returns {IterableIterator<string>} 可枚举行列表
 */
function* genReadLine(str) {
    let tmp = '';
    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (c === '\r') {
            continue;
        }
        if (c === '\n') {
            yield tmp;
            tmp = '';
            continue;
        }
        tmp += c;
    }
    return tmp;
}

exports.fileProcessor = fileProcessor;