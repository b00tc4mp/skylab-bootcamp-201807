const fetch = require('node-fetch');


async function getCatImgByUserId(userId) {

    //SYNC
    const response = await fetch(`https://catappapi.herokuapp.com/users/${userId}`)
    const user = await response.json()

    const { cats } = user

//SYNC or ASYNC? (muahahaha)
    // const catImageUrls = cats.map(async function(catId){
    //     const response = await fetch(`https://catappapi.herokuapp.com/cats/${catId}`)
    //     const catData = await response.json()
    //     return catData.imageUrl
    // })
    // return await Promise.all(catImageUrls)
    // return catImageUrls

//WTF
    // const catImageUrls = []

    // cats.map(function(catId){
    //     fetch(`https://catappapi.herokuapp.com/cats/${catId}`)
    //             .then(res => res.json())
    //             .then(catData => catData.imageUrl)            
    // })


//SYNC
    // const catImageUrls = []
    // for (const catId of cats) {
    //     const response = await fetch(`https://catappapi.herokuapp.com/cats/${catId}`)
    //     const catData = await response.json()
    //     catImageUrls.push(catData.imageUrl)

    // }
    // return catImageUrls



}

getCatImgByUserId(123)
    .then(res => console.log(res))
    .catch(({ message }) => console.log(`Error del servidor: ${message}`))




