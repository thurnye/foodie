//this is the server controller where i do send data to the back end....
const User = require('../Model/user')
const Recipe = require('../Model/recipes')
const Review = require('../Model/review')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 6  // tell bcrypt how many times to randomize the generation of salt. usually 6 is enough.




//Creating A User
const postCreateUser = async (req, res, next) => {
    try { 
        const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)

        const newUser = new User ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        })
        const user = await newUser.save()
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        // send a response to the front end
        res.status(200).json(token)

    }catch(err){
        res.status(400).json('Bad Credentials');
    }
}

// Login a User
const getLogIn = async (req, res) => {
    
    try {
        const user = await User.findOne({ email: req.body.email }).populate({
            path: 'myRecipes.recipe'
        }).exec()
        console.log(user)
          // check password. if it's bad throw an error.
        if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();
  
        // if we got to this line, password is ok. give user a new token.
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.json(token)
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

// POSTING Updated User
const postUpdatedUser = (req, res, next) => {
    const id = req.params.id;

    User.findById(id)
    .then(user => {
        user.firstName =  req.body.firstName;
        user.lastName =  req.body.lastName;
        user.email =  req.body.email;
        user.avatar =  "";
        user.slogan =  req.body.slogan;
        user.aboutMe =  req.body.aboutMe;
        user.location =  req.body.location;
        user.resourceInfo =  req.body.myResource;
        user.resourceList = [];
        user.socialMedia= [{
            facebook : req.body.facebook,
            twitter : req.body.twitter,
            linkedIn : req.body.linkedIn,
            pinterest : req.body.pinterest
            }]
        return user.save()
    })
    .then((user) => {
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.status(200).json(token)
    })
    .catch(err => res.status(400).json(err));
    
}

//Create New Recipe
const postNewRecipe = async (req, res, next) => {
    try{
        const authorId = req.body.author
        const newRecipe = new Recipe({
            author: authorId,
            recipeName: req.body.recipeName,
            description: req.body.description,
            serving: req.body.serving,
            category: req.body.category,
            duration: req.body.duration,
            level: req.body.level,
            tags: req.body.tags,
            mainIngredients: req.body.mainIngredients,
            dressingIngredients: req.body.dressingIngredients,
            directions: req.body.directions,
            notes: req.body.notes,
            thumbnail: req.body.thumbnail,
            nutritionFacts: req.body.nutritionFacts

        })
        let savedRecipe = await newRecipe.save()
        const recipeId = {recipe: savedRecipe._id}
        const foundUser = await User.findById(authorId)

        foundUser.myRecipes.push(recipeId)
        
        await foundUser.save()

        const user =  await User.findById(authorId).populate({
            path: 'myRecipes.recipe'
        }).exec()
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.status(200).json(token)

    }catch(err){
        res.status(400).json(err)
    }    
}

//RETRIEVE ALL RECIPES
const getAllRecipes = async(req, res, next) => {
    try{
        const recipes =  await Recipe.find().populate('author').exec()
        res.status(200).json(recipes)

    }catch(err){
        res.status(400).json(err)
    }   
}
//RETRIVE A Recipe BY ID
const getOneRecipe = async (req, res, next) => {
    try{
        const recipeId = req.params.id;
        const recipeData = await Recipe.findById(recipeId)
        .populate({
            path: 'reviews.review',
            populate: ({ 
                path: 'userId',
                populate: {path: 'myRecipes.recipe'}
            }) 
        })
        .populate({
            path: 'author'
        })
        .exec()

        if(recipeData.reviews.length > 0 ){
            const rating = []
            recipeData.reviews.map(el => rating.push(parseInt(el.review.rating)))
            const sum = rating.reduce((a, b) => a + b)
            const average = sum / rating.length
            recipeData.rating = average.toFixed(1)
            const recipe = await recipeData.save()
            res.status(200).json(recipe)
       }else{
            res.status(200).json(recipeData) 
       }

    }catch(err){
        res.status(400).json(err)
    }   
}


//Post a Review
const postReview = async (req, res, next) => {
    try{
        const recipeId = req.body.recipeId
        const newReview = new Review ({
            review: req.body.review,
            rating: req.body.ratings,
            userId: req.body.userId,
            recipeId: recipeId
        })
        const savedReview = await newReview.save()

        const reviewId = {review:savedReview._id}
        const foundRecipe = await Recipe.findById(recipeId)
        foundRecipe.reviews.push(reviewId)

        const recipe = await foundRecipe.save()



        console.log(recipe)
        res.status(200).json()
    }catch(err){
        res.status(400).json(err)
    } 
}

//DELETING A RECIPE
const postDeleteARecipe = async (req, res, next) => {
    try{ 
        // console.log(req.params.id)
        const recipeId = req.params.id;
        let authorId = ''

        const recipe =  await Recipe.findById(recipeId)
        // console.log(recipe)

        authorId = recipe.author._id
        // console.log(authorId)
        

        // // delete recipe from author account
        const foundUser = await User.findById(authorId).populate({
            path: 'myRecipes.recipe'
        }).exec()
        const recipes = foundUser.myRecipes

        const delRecipe = recipes.findIndex(el => el.recipe._id.toString() === recipeId.toString())


        // delete relations
        recipes.splice(delRecipe, 1)

        await Review.deleteMany({ _id: recipeId})

        recipe.remove()

        const user = await foundUser.save()
        

        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.status(200).json(token)

    }catch(err){
        res.status(400).json(err)
    } 
}






// --------------------------------------

// //RETRIEVE ALL USER 
// const getHomepage = async(req, res, next) => {
//     await User.find().then(users => {
//         res.send({users});
//     })
//     .catch(err => res.status(400).json(err))
// }


// //RETRIEVE A USER BY ID
// const getAUserByID = (req, res, next) => {
//     const id = req.params.id;
//     User.findById(id)
//     .then(data => {
//         res.send({data})
//     })
//     .catch(err => res.status(400).json(err))
// }



// //  GETTING A USER TO EDIT
// const getEdit = (req, res, next) => {
//     const id = req.params.id;
//     User.findById(id)
//     .then(data => {
//         res.send({data})
//     })
//     .catch(err => res.status(400).json(err))
// }

// // POSTING UPDATED USER INFO
// const postEdit = (req, res, next) => {
//     const id = req.body.id;
//     User.findById(id)
//     .then(user => {
//         user.FirstName = req.body.firstName;
//         user.LastName = req.body.lastName;
//         user.Address = req.body.address;
//         user.Number = req.body.number;
//         user.Email = req.body.email;
//         return user.save()
//     })
//     .then((user) => {
//         // send a response to the front end
//         res.status(200).json(user)
//     })
//     .catch(err => res.status(400).json(err));
// }

// //DELETING A USER
// const postDelete = async (req, res, next) => {
//     const id = req.params.id;
//     console.log(id)
//     await User.findByIdAndDelete(id)
//     .then(result => {
//         console.log(result)
//           res.status(200).json(result)
//       })
//     .catch(err => res.status(400).json(err))
// }





module.exports = {
    postCreateUser,
    getLogIn,
    postUpdatedUser,
    postNewRecipe,
    postReview,
    getAllRecipes,
    getOneRecipe,
    postDeleteARecipe,
    
    
    
    
    
    
    
    
    // getHomepage,
    // getAUserByID,
    // getEdit,
    // postEdit, 
    // postDelete,
}