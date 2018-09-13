const validateEmail = require("../utils/validate-email");
const { User, Menu, Dish } = require("../data/models");
const {
  Types: { ObjectId }
} = require("mongoose");
const es6 = require("es6-promise").polyfill();
const fetch = require("isomorphic-fetch");

const logic = {
  /**
   * Validate all strings
   * @param {string} name
   * @param {string} value
   */
  _validateStringField(name, value) {
    if (typeof value !== "string" || !value.length)
      throw new LogicError(`invalid ${name}`);
  },
  /**
   * Validate user email
   * @param {email} email The user's email
   */
  _validateEmail(email) {
    if (!validateEmail(email)) throw new LogicError("invalid email");
  },
  /**
   * Validate numbers
   * @param {string} name
   * @param {number} value
   */
  _validateNumberField(name, value) {
    if (typeof value !== "number") throw new LogicError(`invalid ${name}`);
  },
  /**
   * Validate arrays
   * @param {string} name
   * @param {array} value
   */
  _validateArrayField(name, value) {
    if (!Array.isArray(value) || !value.length)
      throw new LogicError(`invalid ${name}`);
  },
  /**
   * Register new User
   * @param {email} email The user's email
   * @param {string} username The user's username
   * @param {string} password The user's password
   * @param {array} allergens The user's Allergens
   */
  register(email, username, password, allergens = undefined) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);
        this._validateStringField("username", username);
        this._validateStringField("password", password);

        return User.findOne({ email });
      })
      .then(user => {
        if (user)
          throw new LogicError(`user with ${email} email already exist`);
        return User.findOne({ username })
          .then(user => {
            if (user)
              throw new LogicError(`user with ${username} already exist`);
            let newUser = {};
            if (allergens)
              newUser = {
                email,
                username,
                password,
                allergens
              };
            else
              newUser = {
                email,
                username,
                password
              };

            return User.create(newUser);
          })

          .then(() => true);
      });
  },
  /**
   * Login user
   * @param {email} email The user's email
   * @param {string} password The user's password
   */
  authenticate(email, password) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);
        this._validateStringField("password", password);

        return User.findOne({ email });
      })

      .then(user => {
        if (!user)
          throw new LogicError(`user with ${email} email does not exist`);

        if (user.password !== password) throw new LogicError(`wrong password`);

        return user.id;
      });
  },
  /**
   * Retrive all profile user information
   * @param {email} email The user's email
   */
  retrieveProfileUser(email) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);

        return User.findOne({ email });
      })

      .then(user => {
        if (!user)
          throw new LogicError(`user with ${email} email does not exist`);

        return user.allergens;
      });
  },
  /**
   * Update profile user with new allergens
   * @param {email} email The user's email
   * @param {array} allergens The user's old allergens
   * @param {array} newAllergens The user's new allergens
   */
  updateAllergens(email, allergens, newAllergens) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);
        this._validateArrayField("new allergens", newAllergens);

        return User.findOne({ email });
      })
      .then(user => {
        debugger;
        if (!user)
          throw new LogicError(`user with ${email} email does not exist`);

        if (!newAllergens) throw new LogicError(`Wrong allergens`);

        user.allergens = newAllergens;

        return user.save();
      })
      .then(() => true);
  },
  /**
   * Add new menu on one user
   * @param {email} email The user's email
   * @param {string} title The title menu
   */
  addMenu(email, title) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);
        this._validateStringField("title", title);

        return User.findOne({ email });
      })
      .then(user => {
        if (!user)
          throw new LogicError(`user with ${email} email does not exist`);

        if (!title) throw new LogicError(`Wrong title`);

        const menu = { title };

        user.menus.push(new Menu(menu));

        return user.save();
      })
      .then(user => user.menus);
  },
  /**
   *
   * @param {*} email The user's email
   * @param {*} titleDish The title Dish
   * @param {*} recipeId The Recipe ID
   * @param {*} sort The sort number
   * @param {*} menuId The menu ID
   */
  addDish(email, titleDish, recipeId, sort, menuId) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);
        this._validateStringField("title Dish", titleDish);
        this._validateStringField("recipe Id", recipeId);
        this._validateStringField("menuId", menuId);
        this._validateNumberField("sort", sort);

        return User.findOne({ email });
      })
      .then(user => {
        if (!user)
          throw new LogicError(`user with ${email} email does not exist`);

        if (!titleDish) throw new LogicError(`Wrong title dish`);

        if (!recipeId) throw new LogicError(`Wrong recipe Id`);

        if (!sort) throw new LogicError(`Wrong number sort`);

        const dish = { titleDish, recipeId, sort };

        let menuExists = user.menus.find(
          elem => elem._id.toString() === menuId
        );
        if (!menuExists) throw new LogicError(`Menu not found`);
        user.menus.forEach(element => {
          if (element._id.toString() === menuId) {
            element.dishes.push(new Dish(dish));
            return user.save();
          }
        });
        return user;
      });
  },
  /**
   * Delete one recipe from one menu
   * @param {email} email The user's email
   * @param {string} menuId The menu ID
   * @param {string} id The recipe ID
   */
  removeDish(email, menuId, id) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);
        this._validateStringField("Menu Id", menuId);
        this._validateStringField("Dish Id", id);

        return User.findOne({ email, "menus._id": ObjectId(menuId) });
      })
      .then(user => {
        if (!user)
          throw new LogicError(`user with ${email} email does not exist`);

        const dishes = user.menus.find(menu => menu._id.toString() === menuId)
          .dishes;
        const pos = dishes.findIndex(dish => dish._id.toString() === id);

        dishes.splice(pos, 1);

        return user.save();
      })
      .then(() => true);
  },
  /**
   * Delete one menu with recipes
   * @param {email} email The user's email
   * @param {menuId} menuId The menu ID
   */
  removeMenu(email, menuId) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);
        this._validateStringField("Menu ID", menuId);

        return User.findOne({ email });
      })
      .then(user => {
        if (!user)
          throw new LogicError(`user with ${email} email does not exist`);

        let menuExists = user.menus.find(
          elem => elem._id.toString() === menuId
        );

        if (!menuExists) throw new LogicError(`Menu not found`);

        const pos = user.menus.findIndex(
          menu => menu._id.toString() === menuId
        );

        user.menus.splice(pos, 1);

        return user.save();
      })
      .then(() => true);
  },
  /**
   * List all menus from one user
   * @param {email} email The user's email
   */
  listMenus(email) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);

        return User.findOne({ email });
      })
      .then(user => {
        if (!user) throw new LogicError(`user ${user} does not exist`);

        return (menus = user.menus.map(menu => menu));
      });
  },
  /**
   * List all recipes from one menu
   * @param {email} email The user's email
   * @param {string} menuId The menu ID
   */
  listDishes(email, menuId) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);
        this._validateStringField("menu ID", menuId);

        return User.findOne({ email });
      })
      .then(user => {
        if (!user) throw new LogicError(`user ${user} does not exist`);

        if (!menuId) throw new LogicError("Invalid menu ID");

        return user.menus.find(menu => menu.id === menuId).dishes;
      });
  },
  /**
   * Search one recipe by ID on user loged
   * @param {email} email The user's email
   * @param {string} menuId the menu ID
   */
  searchRecipeById(email, menuId) {
    const appId = "6b5aa10e",
      appKey = "ecc14d0ee3cece665188f76abb1ad5ab",
      recipesData = [];

    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);
        this._validateStringField("Menu ID", menuId);

        return User.findOne({ email, "menus._id": ObjectId(menuId) });
      })
      .then(user => {
        if (!user)
          throw new LogicError(`user with ${email} email does not exist`);

        return user.menus.find(menu => menu._id.toString() === menuId);
      })
      .then(user => {
        const urls = user.dishes.map(
          dish =>
            `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${
              dish.recipeId
            }&app_id=${appId}&app_key=${appKey}`
        );

        return Promise.all(urls.map(fetch))
          .then(responses =>
            Promise.all(responses.map(response => response.json()))
          )
          .then(recipes => {
            recipes.forEach(_recipe => {
              const recipe = _recipe[0];
              const recipeData = {
                uri: recipe.uri,
                label: recipe.label,
                image: recipe.image,
                source: recipe.source,
                url: recipe.url,
                yield: recipe.yield,
                ingredients: recipe.ingredientLines,
                calories: recipe.calories,
                time: recipe.totalTime,
                fat: recipe.totalNutrients.FAT,
                fasat: recipe.totalNutrients.FASAT,
                fatrn: recipe.totalNutrients.FATRN,
                carbs: recipe.totalNutrients.CHOCDF,
                fiber: recipe.totalNutrients.FIBTG,
                sugar: recipe.totalNutrients.SUGAR,
                protein: recipe.totalNutrients.PROCNT,
                cholesterol: recipe.totalNutrients.CHOLE
              };

              recipesData.push(recipeData);
            });

            return recipesData;
          });
      });
  },
  /**
   * Basic search recipe by id without user logged
   * @param {string} recipeId
   */
  basicSearchRecipeById(recipeId) {
    const appId = "6b5aa10e",
      appKey = "ecc14d0ee3cece665188f76abb1ad5ab",
      recipesData = [];

    return Promise.resolve()
      .then(() => {
        return fetch(
          `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${recipeId}&app_id=${appId}&app_key=${appKey}`
        );
      })
      .then(function(response) {
        return response.json();
      })
      .then(recipe => {
        const recipeData = {
          uri: recipe[0].uri,
          label: recipe[0].label,
          image: recipe[0].image,
          source: recipe[0].source,
          url: recipe[0].url,
          yield: recipe[0].yield,
          ingredients: recipe[0].ingredientLines,
          calories: recipe[0].calories,
          time: recipe[0].totalTime,
          fat: recipe[0].totalNutrients.FAT,
          fasat: recipe[0].totalNutrients.FASAT,
          fatrn: recipe[0].totalNutrients.FATRN,
          carbs: recipe[0].totalNutrients.CHOCDF,
          fiber: recipe[0].totalNutrients.FIBTG,
          sugar: recipe[0].totalNutrients.SUGAR,
          protein: recipe[0].totalNutrients.PROCNT,
          cholesterol: recipe[0].totalNutrients.CHOLE
        };

        recipesData.push(recipeData);
      })
      .then(() => {
        return recipesData;
      });
  },
  /**
   * Search recipes with allergens from one user
   * @param {string} query
   * @param {email} email
   */
  searchRecipeAllergens(query, email) {
    const appId = "6b5aa10e",
      appKey = "ecc14d0ee3cece665188f76abb1ad5ab",
      results = [];

    return Promise.resolve()
      .then(() => {
        this._validateEmail(email);
        this._validateStringField("query", query);

        return User.findOne({ email });
      })
      .then(user => {
        if (!user)
          throw new LogicError(`user with ${email} email does not exist`);

        if (!query) throw new LogicError(`Invalid ${query} search`);

        return user.allergens;
      })
      .then(allergens => {
        let allergenPath = "";

        allergens.forEach(allergens => {
          allergenPath += `health=${allergens}&`;
        });

        return fetch(
          `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&${allergenPath}from=0&to=100`
        );
      })
      .then(function(response) {
        return response.json();
      })

      .then(recipes => {
        recipes.hits.forEach(recipeObj => {
          const { recipe } = recipeObj;

          const recipeData = {
            uri: recipe.uri,
            label: recipe.label,
            image: recipe.image,
            source: recipe.source,
            url: recipe.url,
            yield: recipe.yield,
            ingredients: recipe.ingredientLines,
            calories: recipe.calories,
            time: recipe.totalTime,
            fat: recipe.totalNutrients.FAT,
            fasat: recipe.totalNutrients.FASAT,
            fatrn: recipe.totalNutrients.FATRN,
            carbs: recipe.totalNutrients.CHOCDF,
            fiber: recipe.totalNutrients.FIBTG,
            sugar: recipe.totalNutrients.SUGAR,
            protein: recipe.totalNutrients.PROCNT,
            cholesterol: recipe.totalNutrients.CHOLE
          };
          results.push(recipeData);
        });
        return results;
      });
  },
  /**
   * Basic search without allergens
   * @param {string} query
   */
  basicSearch(query) {
    const appId = "6b5aa10e",
      appKey = "ecc14d0ee3cece665188f76abb1ad5ab",
      results = [];

    return Promise.resolve()
      .then(() => {
        this._validateStringField("query", query);

        return fetch(
          `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=100`
        );
      })
      .then(function(response) {
        return response.json();
      })

      .then(recipes => {
        recipes.hits.forEach(recipeObj => {
          const { recipe } = recipeObj;
          const recipeData = {
            uri: recipe.uri,
            label: recipe.label,
            image: recipe.image,
            source: recipe.source,
            url: recipe.url,
            yield: recipe.yield,
            ingredients: recipe.ingredientLines,
            calories: recipe.calories,
            time: recipe.totalTime,
            fat: recipe.totalNutrients.FAT,
            fasat: recipe.totalNutrients.FASAT,
            fatrn: recipe.totalNutrients.FATRN,
            carbs: recipe.totalNutrients.CHOCDF,
            fiber: recipe.totalNutrients.FIBTG,
            sugar: recipe.totalNutrients.SUGAR,
            protein: recipe.totalNutrients.PROCNT,
            cholesterol: recipe.totalNutrients.CHOLE
          };
          results.push(recipeData);
        });

        return results;
      });
  }
};

class LogicError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  logic,
  LogicError
};
