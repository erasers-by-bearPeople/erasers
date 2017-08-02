const db = require('./server/db/index')
let Promise = require('bluebird')

// _NAME = variables holding dummy data
const _users = [
  {
    name: 'Noor',
    email: 'noor.grewal@berkeley.edu',
    password: 'my-net-crashed'
  },
  {
    name: 'Dennis',
    email: 'dennis@email.com',
    password: 'bachelor-parties'
  },
  {
    name: 'Lina',
    email: 'jones@email.com',
    password: 'mountains'
  },
  {
    name: 'Shayne',
    email: 'shayne@email.com',
    password: 'reggie'
  },
  {
    name: 'Tom',
    email: 'cody@email.com',
    password: 'cody'
  },
  {
    name: 'Jeff',
    email: 'jeff@email.com',
    password: 'im-a-fellow'
  },
  {
    name: 'John the Admin',
    email: 'john@email.com',
    password: 'tacos',
    isAdmin: true
  },
  {
    name: 'Steve Stevenson',
    email: 'steve@email.com',
    password: 'hello',
    isAdmin: false,
    changePassword: true
  }
]

const _products = [
  {
    title: 'Action Pack',
    description: 'The only crime these erasers fight are mistakes',
    price: 425,
    category: 'Novelty',
    inventory: 1,
    image: '/images/marvel.jpg'
  },
  {
    title: 'Jungle Buddies',
    description: 'Turn a plain desk into an adventurous animal kingdom with this set of 7 erasers.',
    price: 500,
    category: 'Novelty',
    inventory: 10,
    image: '/images/animals.jpg'
  },
  {
    title: 'Fast Food Fun',
    description: 'Each of these high calorie delights is made of soft rubber, and is functional as well as adorable! Set includes 6 pieces',
    price: 850,
    category: 'Novelty',
    inventory: 100,
    image: '/images/ffood.jpg'
  },
  {
    title: 'Just Desserts',
    description: 'Try not to take a bite when you erase mistakes with these tasty treats (not actually edible).  This set includes 6 pieces.',
    price: 975,
    category: 'Novelty',
    inventory: 1000,
    image: '/images/desserts.jpg'
  },
  {
    title: 'Crayon, Crayoff',
    description: 'No worries about drawings on the wall with this colorful set, watch as your confused child tries to color to no avail',
    price: 350,
    category: 'Novelty',
    inventory: 100,
    image: '/images/crayons.jpg'
  },
  {
    title: 'MONO Eraser',
    description: `Subborn pencil marks on your page? Not with the MONO eraser around...those marks...they're so gone`,
    price: 275,
    category: 'Standard',
    inventory: 1000,
    image: '/images/whiteSing.jpg'
  }
]

const _reviews = [
  {
    title: 'My favorite erasers!',
    message: 'Erases so good',
    userId: 1,
    rating: 5,
    productId: 1
  },
  {
    title: 'The cutest',
    message: `Who says you can't have fun and erase things at the same time?`,
    userId: 4,
    rating: 5,
    productId: 1
  },
  {
    title: 'Love my erasers',
    message: `there were pencil marks, then there weren't`,
    userId: 2,
    rating: 5,
    productId: 2
  },
  {
    title: 'Solid',
    message: 'What else can I say, they get the job done',
    userId: 3,
    rating: 5,
    productId: 3
  },
  {
    title: `You won't regret it!`,
    message: 'buy these things!',
    userId: 4,
    rating: 3,
    productId: 4
  },
  {
    title: 'All bout erasers',
    message: 'great addition to the collection',
    userId: 5,
    rating: 2,
    productId: 5
  },
  {
    title: 'Best',
    message: 'my kid raves about this eraser',
    userId: 6,
    rating: 1,
    productId: 6
  }
]

const _orders = [
  {
    status: 'active',
    userId: 1,
    name: 'Noor',
    email: 'noor.grewal@berkeley.edu',
    city: 'Wooster',
    street: '4844 Monroe Street',
    state: 'AK',
    zip: 72181
  },
  {
    status: 'active',
    userId: 2,
    name: 'Brad Johnson',
    email: 'brad@email.com',
    city: 'Chester',
    street: '699 Laurens St',
    state: 'GA',
    zip: 31012
  },
  {
    status: 'pending',
    userId: 3,
    name: 'Jackie Smith',
    email: 'jackie@email.com',
    city: 'Chester',
    street: '699 Laurens St',
    state: 'GA',
    zip: 31012
  },
  {
    status: 'complete',
    name: 'Edward Jones',
    email: 'ed@email.com',
    city: 'Booneville',
    street: '200 County Rd #130',
    state: 'MS',
    zip: 38829
  },
  {
    status: 'complete',
    userId: 4,
    name: 'Aaron Snow',
    email: 'aaron@email.com',
    city: 'Crescent City',
    street: '231 3rd St',
    state: 'CA',
    zip: 95531
  },
  {
    status: 'pending',
    name: 'Dennis',
    email: 'dennis@email.com',
    city: 'Lenoir',
    street: '7456 Falcon Ridge Rd',
    state: 'NC',
    zip: 28645
  }

]

const _lineitem = [
  {
    price: 10,
    quantity: 10,
    orderId: 1,
    productId: 1
  },
  {
    price: 20,
    quantity: 9,
    orderId: 2,
    productId: 2
  },
  {
    price: 30,
    quantity: 8,
    orderId: 3,
    productId: 3
  },
  {
    price: 40,
    quantity: 7,
    orderId: 4,
    productId: 4
  },
  {
    price: 50,
    quantity: 6,
    orderId: 5,
    productId: 5
  },
  {
    price: 60,
    quantity: 5,
    orderId: 6,
    productId: 6
  }
]


let seed = (_seedData, model) => {
  return Promise.map(_seedData, (data) => {
    return db.model(model).create(data)
  })
}

/*
* sync the db
* seed the 5 models
* generate helpful messages to confirm seeding
* throw an error if caught
* close the connection without using a promise
* silence bluebird warning
* */

db.sync({force: true})
  .then(() => {
      console.log('dropped old data, now inserting new data')
  })
  .then(() => seed(_users, 'user'))
  .then(users => console.log(`Seeded ${users.length} users OK!`))
  .then(() => seed(_products, 'product'))
  .then(products => console.log(`Seeded ${products.length} products OK!`))
  .then(() => seed(_orders, 'order'))
  .then(orders => console.log(`Seeded ${orders.length} orders OK!`))
  .then(() => seed(_lineitem, 'lineitem'))
  .then(lineitems => console.log(`Seeded ${lineitems.length} lineitems OK!`))
  .then(() => seed(_reviews, 'review'))
  .then(review => console.log(`Seeded ${review.length} reviews OK!`))
  .then(() => {
    console.log('Seeding complete OK!')
  })

  /*
  *
  * which function was called
  * in which order
  * what line #
  * file name
  * and arguments.
  *
  * */

  .catch((err) => {
    console.error('There was a problem seeding the database', err, err.stack)
  })
  .finally(() => {
    db.close()
    console.log('seed db connection closed OK!')
    return null
  })
