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
        email: 'cody@email.com'
        password: 'cody'
    },
    {
        name: 'Jeff',
        email: 'jeff@email.com',
        password: 'im-a-fellow'
    }
]

const _products = [
    {
        title: 'batman',
        description: "batman's personal erasor stolen from joker",
        price: 1000,
        category: 'category1',
        inventory: 1,
        image: ''
    },
    {
        title: 'product 2',
        description: 'description 2',
        price: 100,
        category: 'category 2',
        inventory: 10,
        image: 'image url 2'
    },
    {
        title: 'product 3',
        description: 'description 3',
        price: 1000,
        category: 'category1',
        inventory: 100,
        image: 'image url 3'
    },
    {
        title: 'product4',
        description: 'description 4',
        price: 10000,
        category: 'category2',
        inventory: 1000,
        image: 'image url 4'
    },
    {
        title: 'product 5',
        description: 'description 5',
        price: 100000,
        category: 'category1',
        inventory: 10000,
        image: 'image url 5'
    },
    {
        title: 'product 6',
        description: 'description 6',
        price: 1000000,
        category: 'category2',
        inventory: 100000,
        image: 'image url 6'
    }
]

const _reviews = [
    {
        title: 'review 1',
        message: 'this is the first message'
    },
    {
        title: 'review 2',
        message: 'this is the second message'
    },
    {
        title: 'review 3',
        message: 'this is the third message'
    },
    {
        title: 'review 4',
        message: 'this is the fourth message'
    },
    {
        title: 'review 5',
        message: 'this is the fifth message'
    },
    {
        title: 'review 6',
        message: 'this is the sixth message'
    }
]

const _orders = [
    {
        complete: true,
        sessionId: 'akdagfggauf632735'
    },
    {
        complete: false,
        sessionId: 'jabdfgf8723252754'
    },
    {
        complete: true,
        sessionId: 'dbaiuia378254d282'
    },
    {
        complete: false,
        sessionId: 'ahudad3726424284a'
    },
    {
        complete: true,
        sessionId: 'fgiuagf728762bahd'
    },
    {
        complete: false,
        sessionId: 'jkdadh2389724kjba'
    }
]

const _lineitem = [
    {
        price: 10,
        quantity: 10
    },
    {
        price: 20,
        quantity: 9
    },
    {
        price: 30,
        quantity: 8
    },
    {
        price: 40,
        quantity: 7
    },
    {
        price: 50,
        quantity: 6
    },
    {
        price: 60,
        quantity: 5
    }
]


let seed = (_seedData, model) => {
    Promise.map(_seedData, (data) => {
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
  .then(seed(_users, 'users'))
  .then((users) => {
      console.log(`Seeded ${users.length} users OK!`)
  })
  .then(seed(_products, 'products'))
  .then((products) => {
      console.log(`Seeded ${products.length} products OK!`)
  })
  .then(seed(_lineitem, 'lineitems'))
  .then((lineitems) => {
      console.log(`Seeded ${lineitems.length} lineitems OK!`)
  })
  .then(seed(_orders, 'orders'))
  .then((orders) => {
      console.log(`Seeded ${orders.length} orders OK!`)
  })
  .then(seed(_reviews, 'reviews'))
  .then((reviews) => {
      console.log(`Seeded ${reviews.length} reviews OK!`)
  })
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
