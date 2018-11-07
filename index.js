const { main } = require('./lib/main');

main('./md', './_pub');


// new Promise((res, rej) => {
//     res('res');
// })
//     .then((args) => {
//         console.log(args);
//     })
//     .then((args) => {
//         console.log(args);

//         return '???';
//     })
//     .then((args) => new Promise((res, rej) => {
//         console.log(args);
//         setTimeout(() => {
//             res('p2');
//         }, 1000);
//     }))
//     .then((args) => {
//         console.log(args);
//     });
