function printMem() {
    const used = process.memoryUsage().rss / 1024 / 1024
    
    console.log(`Memory used ${Math.round(used * 100) / 100} MB`)

    // console.log(`Memory used ${JSON.stringify(process.memoryUsage(), null, 4)}`)
}

module.exports = printMem