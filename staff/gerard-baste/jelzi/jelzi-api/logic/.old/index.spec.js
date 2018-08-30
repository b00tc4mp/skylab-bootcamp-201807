true && describe('save recipe', () => {
    // let nutritions = {label: 'Fat', quantity:200, unit:'g'};

    beforeEach(() => User.create({
        email,
        username,
        password,
        allergens
    }))

    it('should save recipe correctly', () => {
        return logic.saveRecipes(email, recipeName, recipeImage, recipeUrl, recipeYield, recipeIngredients, recipeTime, recipeCalories, nutritions)
            .then(res => {
                expect(res).to.be.true

                return Recipe.findOne({
                    recipeName
                })
            })
            .then(recipe => {
                expect(recipe).to.exist
                expect(recipe.recipeName).to.equal('Rice with milk')
                expect(recipe.recipeImage).to.equal('https://image.jpg')
                expect(recipe.recipeUrl).to.equal('https://recipeurl.com')
                expect(recipe.recipeYield).to.equal(4)
                expect(recipe.recipeIngredients).to.deep.equal(['Rice', 'Milk', 'Cinnamon'])
                expect(recipe.recipeTime).to.equal(15)
                expect(recipe.recipeCalories).to.equal(2000)
                expect(recipe.nutritions).to.have.lengthOf(1)
            })
    })

    it('should fail on trying to save recipe with an undefined recipe name', () =>
        logic.saveRecipes(email, undefined, recipeImage, recipeUrl, recipeYield, recipeIngredients, recipeTime, recipeCalories, nutritions)
        .catch(err => err)
        .then(({
            message
        }) => expect(message).to.equal(`invalid recipeName`))
    )
    it('should fail on trying to save recipe with an invalid string recipe name', () =>
        logic.saveRecipes(email, '', recipeImage, recipeUrl, recipeYield, recipeIngredients, recipeTime, recipeCalories, nutritions)
        .catch(err => err)
        .then(({
            message
        }) => expect(message).to.equal(`invalid recipeName`))
    )

    it('should fail on trying to save recipe with an number recipe name', () =>
        logic.saveRecipes(email, 123, recipeImage, recipeUrl, recipeYield, recipeIngredients, recipeTime, recipeCalories, nutritions)
        .catch(err => err)
        .then(({
            message
        }) => expect(message).to.equal(`invalid recipeName`))
    )

    it('should fail on trying to save recipe with undefined yield', () =>
        logic.saveRecipes(email, recipeName, recipeImage, recipeUrl, undefined, recipeIngredients, recipeTime, recipeCalories, nutritions)
        .catch(err => err)
        .then(({
            message
        }) => expect(message).to.equal(`invalid recipeYield`))
    )
    it('should fail on trying to save recipe with string yield', () =>
        logic.saveRecipes(email, recipeName, recipeImage, recipeUrl, '', recipeIngredients, recipeTime, recipeCalories, nutritions)
        .catch(err => err)
        .then(({
            message
        }) => expect(message).to.equal(`invalid recipeYield`))
    )
    // it('should fail on trying to save recipe with undefined recipe ingredients', () =>
    //     logic.saveRecipes(email, recipeName, recipeImage, recipeUrl, recipeYield, undefined, recipeTime, recipeCalories, nutritions)
    //     .catch(err => err)
    //     .then(({
    //         message
    //     }) => expect(message).to.equal(`invalid recipeIngredients`))
    // )
    it('should fail on trying to save recipe with string recipe ingredients', () =>
        logic.saveRecipes(email, recipeName, recipeImage, recipeUrl, recipeYield, '', recipeTime, recipeCalories, nutritions)
        .catch(err => err)
        .then(({
            message
        }) => expect(message).to.equal(`invalid recipeIngredients`))
    )
    it('should fail on trying to save recipe with number recipe ingredients', () =>
        logic.saveRecipes(email, recipeName, recipeImage, recipeUrl, recipeYield, 123, recipeTime, recipeCalories, nutritions)
        .catch(err => err)
        .then(({
            message
        }) => expect(message).to.equal(`invalid recipeIngredients`))
    )
    it('should fail on trying to save recipe with blank array recipe ingredients', () =>
        logic.saveRecipes(email, recipeName, recipeImage, recipeUrl, recipeYield, [], recipeTime, recipeCalories, nutritions)
        .catch(err => err)
        .then(({
            message
        }) => expect(message).to.equal(`invalid recipeIngredients`))
    )
})