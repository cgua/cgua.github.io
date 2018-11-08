
function Url(href) {
    this.searchParams = new Map();

    if (href === undefined) {
        return;
    }

    if (typeof href !== 'string') {
        throw new Error('err code: 181108234323,非法的 href.');
    }

    const searchString = href.match('(?![^\\?]+\\?)[^\\?]+');
    if (searchString === null) {
        return;
    }

    const arr = searchString[0].split('&');
    arr.forEach((str, _) => {
        // todo 防止出现多个 = 号
        const [k, v] = str.split('=');
        this.searchParams.set(k, v);
    });

}

window.addEventListener('load', () => {
    const url = new Url(window.location.href);
    const cUrl = '_pub/' + url.searchParams.get('page') + '.txt';

    const ajax = new XMLHttpRequest();
    ajax.open('get', cUrl);
    ajax.onreadystatechange = (_ev) => {
        if (ajax.readyState === 4) {
            if ((ajax.responseText || '').length < 1) {
                return;
            }
            const markdown = document.querySelector('#js-markdown');
            markdown.innerHTML = ajax.responseText;
            markdown.querySelectorAll('pre').forEach((block) => {
                hljs.highlightBlock(block);
            })
        }
    };
    ajax.send();
});

