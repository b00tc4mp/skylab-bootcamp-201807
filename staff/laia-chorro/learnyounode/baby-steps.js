/*const args = process.argv

let sum = 0;
for (var i = 2; i < args.length; i++) {
    sum += parseInt(args[i])
}*/

let sum = process.argv.reduce((prev, current, index) => {
        if (index > 1) return parseInt(prev || 0) + parseInt(current);
    });

console.log(sum)