# REVIEW

## Feature completeness

* I'm very impressed with the spread of features you were able to incorporate. While you didn't quite get to the extra feature, it seems like you were able to get to most of the standard features.

## Code quality and general best practices in front-end and back-end

* Good quality overall. There's a good consistency to the way that your various files are structured (components, routes, models, tests, and the redux store)

## Project management and effective use of Git

* As we learned near the end, it's important to deploy frequently! In the real world, this allows us to get new features out to our clients as quickly as possible (so that we can start generating feedback about those features). For our purposes, it will help us identify and address problems in our deployment pipeline early on and in closer proximity to the introduction of the problem

## Quality of unit tests

* Good job to get started with writing tests on the front end
* Remember that good tests:
  * Can be run in any order: a test should never require a previous test to have run before it, and any state created by a test should be wiped away before the next test case is run
  * Test only the code you write: testing that an instance of a Sequelize model has the appropriate key-value pairs after creation isn't testing your code - it's testing Sequelize's code

  An ideal test of a function allows us to treat that function like a black box: for some input, we get some output. Once we can make assertions about that behavior, we can change the implementation of that function, and still confirm that it works the same way using that test.

## Schema design

* Well done overall with the way you've organized the tables.
* You may want to take more advantage of instance methods and class methods to abstract the more verbose queries. For example, instead of saying: `Review.findAll({where: {productId: id}})`, you could write a classMethod called `Review.findByProductId` that wraps the query. It probably seems like that's just sweeping the dust under the rug, but that's actually a totally acceptable practice in programming - the key is to identify where to put complexity and where to have abstracted simplicity. In general, we want our API routes to be very easy to read - it's okay to push all of the sorry details of our queries off into our Sequelize model methods.
* For the Product table, it would be difficult for an administrator to create a new category, because category is simply an ENUM, which is inflexible. The way to handle that would be to have a separate Category table, with a `belongsToMany` relationship between Products and Categories (meaning you would have an associated join table, ex. `ProductCategory`).

## RESTfulness of routes

* The session should be used to persist some state about the client, but it shouldn't be used to hold information about where the client is in our app. For example, I noticed that things like reviews and products were also being attached to the session. Keeping track of which review we're currently looking at or operating on is the role of route parameters. If we use the session to keep track of where we are or what we're looking at, we run into the problems of statefulness - we need to remember to assign and remove items from the session for all a manner of interactions, and that's really hard. The session is very useful for things like the logged in user and the cart, because our server needs to remember those and can't be reminded through any other reliable means. Otherwise though, we should try to minimize the amount of info we keep on the session.
* Remember to favor using the `router.param` pattern that we discussed for updates and deletion, rather then using the methods on the model. You'll run into fewer headaches and won't have to worry about whether or not the hooks on the instances will run.

## DRY/Separation of Concerns

* There are inconsistencies between the way that you add products to the cart from the single product page and from the all-products page. If you make that button its own component, or completely encapsulate the entirety of that functionality into a thunk, you'll have all of the functionality in one place

## Security

* Your routes are still insecure - there's no validation middleware to ensure that a non-logged in user can't just fly in see everyone's orders. Be sure to review how to write this kind of middleware from the talk that we had last Wednsday: https://youtu.be/1wIfeqgiHss

## Design/UI/Usability

* Lookin' good! Try adding some margin and padding around some buttons and form elements to give them a little bit more breathing room.
* There are some really nice UX touches - I really like that you ask users to confirm before removing things from the cart.
