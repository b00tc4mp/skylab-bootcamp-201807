const fetch = require('node-fetch');


function getCatImgByUserId(userId) {

    //ASYNC
    return fetch(`https://catappapi.herokuapp.com/users/${userId}`)
        .then(res => res.json())
        .then(user => {
            const promises = user.cats.map(catId =>
                fetch(`https://catappapi.herokuapp.com/cats/${catId}`)
                    .then(res => res.json())
                    .then(catData => catData.imageUrl)

            )
            return Promise.all(promises)
        })
        // .then(res =>res)
}


getCatImgByUserId(123)
    .then(res => console.log(res))



