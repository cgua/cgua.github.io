
/**
 * 1
 * @param {*} path 1
 * @param {*} fcb  1
 * @param {*} pcb  1
 * @returns {Promise<void>} emm
 */
function pathTraversal(path, fcb, pcb) {

}


/**
 * 
 * @param {string} file 文件名
 * @param {fileCallback} cb   回调函数
 * @returns {Promise<void>} promise
 */
async function filePromise(file, cb) {
    return new Promise((resolve, _rejece) => {
        new Promise((res) => {
            res(file);
        })
            .then(cb)
            .then(resolve);
    });
}

/** 
 * @callback fileCallback
 * @param {string} file
 * @returns {void} void
 */
