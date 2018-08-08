const fetch = require('node-fetch');


async function getCatImgByUserId(userId) {

    //SYNC
    const response = await fetch(`https://catappapi.herokuapp.com/users/${userId}`)
    const user = await response.json()
    // const catImageUrls = []
    const {cats} = user

    const catImageUrls = cats.map(async function(catId){

        const response = await fetch(`https://catappapi.herokuapp.com/cats/${catId}`)
        const catData = await response.json()
        return catData.imageUrl
    })

    // for (const catId of cats) {
    //     const response = await fetch(`https://catappapi.herokuapp.com/cats/${catId}`)
    //     const catData = await response.json()
    //     catImageUrls.push(catData.imageUrl)

    // }

    return await Promise.all(catImageUrls)
    // return catImageUrls

}


getCatImgByUserId(123)
    .then(res => console.log(res))




