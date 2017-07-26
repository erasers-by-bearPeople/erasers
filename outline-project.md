### Outline

#### Workflow

- major todo to break into smaller increments
- meet up for code review after each section
- es6 style
- focus on code readability
- read me file.. links to docs as needed..

#### Code
- test cases
- review
- db
    - models
        - product
        - users
        - reviews
        - order
- review
- store (redux)
- review
- components
     - user interface
     - admin interface
- review
- api routes that pull the models
- review
- authentication
- review
- css/scss
- review

product needs quanity


#### API Routes Convo

1. users


Unauthenticated Users
  A. all products (get)X
    i. by cat (get)X
    ii. search (get)X
    iii. individual products with reviews (get) X

  B. cart / line items (get)
    i. add (post)
    ii. remove (delete)
    iii. checkout (put/post) need (address address)
        - shipping info (post)

    iv. edit cart (quantities) - put
  C. Account Management
    i. create an account
    ii. login facebook
    (auth routes ... )



Authenticated
  Logout (put)
  Account Management
    view past/open orders (get)
    individual order (get) / open - edit
  E. make review (post)

2. admin
- Product Management
  A. Add product (post)X
  B. Update product (put)X
  C. Delete Product (delete)X

  D. Possible approve review
- Order Management
  View a list of all orders (get)
  Filter orders by status (Created, Processing, Cancelled, Completed) - might not be route
  Change the status of the order (Created -> Processing, Processing -> Cancelled || Completed) (put)
  View details of a specific order (get)

User Management
    i.Promote other user accounts to have admin status (put)
    ii. Delete a user (delete)
    iii. Trigger password reset for a user (put) ???
