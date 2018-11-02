/* eslint-disable require-jsdoc */
/**
 * 将字符串分割成两串
 * @param {string} str      要分割的字符串
 * @param {string} spliter  分割符
 * @returns {([string,string] | undefined)} 分割之后的键值对
 */
const splitKVPair = (str, spliter = ':') => {
    const pos = str.indexOf(spliter);

    if (pos <= 0) {
        return [undefined, undefined];
    }
    const key = str.slice(0, pos);
    const value = str.slice(pos + 1);

    return [key.trim(), value.trim()];
};

/**
 * 读取一行
 * @param {string} str 要读取的字符串
 * @returns {IterableIterator<string>} 可枚举行列表
 */
function* genReadLine(str) {
    let tmp = '';

    for (let i = 0; i < str.length; i++) {
        const c = str[i];

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

/**
 * 从 markdown 中获取头部信息
 * @param {string} fileContent 要解析的字符串
 * @returns {Map<string,string>} 取得的头部信息
 */
const getMeta = (fileContent) => {

    const map = new Map();
    const headReg = new RegExp('^\\s*\\<\\!\\-{2,}[\\s\\S]+\\-{2,}\\>');
    const head = fileContent.match(headReg);

    if (head !== undefined) {

        const lr = genReadLine(head[0]);

        while (true) {
            const next = lr.next();

            if (next.done) {
                break;
            }
            const [k, v] = splitKVPair(next.value);

            if (k !== undefined) {
                map.set(k, v);
            }
        }
    }

    if (!map.has('title')) {
        const titleReg = new RegExp('\\n\\s*#\\s+(.+)');
        const title = fileContent.match(titleReg);

        map.set('title', title[1]);
    }

    return map;
};


exports.getMeta = getMeta;
