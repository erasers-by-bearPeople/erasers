* Looking good so far - be sure to review the requirements to make sure that you've got the appropriate fields set up in your models. For your API routes - you are using the url parameter a bit more than you need to. Don't forget that `req.body` and `req.query` can make your routes more flexible
* Make sure that your Github issues are more descriptive - otherwise, it's totally possible that you'll forget what you need to do for a particular todo
* It looks like you're about to get started with tests. Tests are important - but don't overdo it. My goal here is to get you used to writing tests and start
  to get a feeler for what kinds of tests are useful. Ideally, I would like to see something like this:
    - At least one test per API route
    - At least one test per instance method/class method/getter/setter/validation on each model (don't bother with the user model though - just the code you've written)
    - That being said, I don't want you to spend more than half a day on writing tests at this point, so even if you don't quite get there at the end of that period, I'll be happy
* Start thinking about access control - who should be able to get all the orders? Can logged in users get their own orders?

Discussion questions:
- How has group work been so far? Is there anything that's working well? Anything that needs to change?
- How is your project management?
- How did things turn out for the cart?
- How are you going to start with the front-end?
