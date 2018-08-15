const jwt = require('jsonwebtoken')

const secret = 'my secret phrase nobody knows, apart from me'

// on login...

const token = jwt.sign({
    sub: 'fulanito'
}, secret, {
        expiresIn: 1
    })

console.log(token)

// on accessing a private route like user/fulanito/files/README.md

setTimeout(() => {

    const payload = jwt.verify(token, secret)

    console.log(payload)

    console.log(payload.sub === 'fulanito')
}, 10)