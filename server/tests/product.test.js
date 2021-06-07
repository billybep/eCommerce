const request = require('supertest')
const app = require('../app')
const { Product, User, sequelize } = require('../models')
const { encryptPassword } = require('../helpers/bcrypt')
const { encodeToken } = require('../helpers/jwt')
const { queryInterface } = sequelize
let productId = 0

beforeAll(done => {  
  queryInterface.bulkInsert('Users', [
    {
      username  : "admin",
      email     : "admin@mail.com",
      password  : encryptPassword('admin123'),
      role      : "admin",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      username  : "client",
      email     : "client@mail.com",
      password  : encryptPassword('client123'),
      role      : "customer",
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ])

  queryInterface.bulkInsert('Products', [
    {
      name       : "Macbook Pro 16",
      description: "The best for the brightest.",
      image_url  : "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      price      : 25000000,
      stock      : 5,
      createdAt  : new Date(),
      updatedAt  : new Date()
    },
    {
      name       : "MacBook Air",
      description: "Power. It’s in the Air.",
      image_url  : "https://images.unsplash.com/photo-1606248896999-387b3a9f621c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price      : 18000000,
      stock      : 4,
      createdAt  : new Date(),
      updatedAt  : new Date()
    }
  ])
  done()
})


afterAll(done => {
  User
    .destroy({ truncate: true, restartIdentity: true })
    .then(res => done())
    .catch(err => done(err))

  Product
    .destroy({ truncate: true, restartIdentity: true })
    .then(res => done())
    .catch(err => done(err))
  // queryInterface.bulkDelete('Users', null, {})
  // queryInterface.bulkDelete('Products', null, {})
  done()
})

describe('POST /products', () => {
  const adminToken = encodeToken({ 
    username: 'admin',
    email   : 'admin@mail.com',
    role    : 'admin'
  })

  const userToken = encodeToken({
    username  : "client",
    email     : "client@mail.com",
    role      : 'customer'
  })

  it('when success should send response with status code 201', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "Lenovo ideapad",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : 8500000,
        stock       : 3
      })
      .then(result => {
        expect(result.status).toEqual(201)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toHaveProperty('newProduct')
        expect(result.body.newProduct)
          .toEqual(expect.objectContaining({
            id          : expect.any(Number),
            name        : "Lenovo",
            description : "Lenovo ideapad",
            image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
            price       : 8500000,
            stock       : 3,
            createdAt   : expect.any(String),
            updatedAt   : expect.any(String)
          }))
        productId = result.body.newProduct.id
        done()
      })
      .catch(err => done(err))
  })

  it('empty token should response with status code 400', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      // .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "Lenovo ideapad",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : 8500000,
        stock       : 3
      })
      .then(result => {
        expect(result.status).toEqual(400)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({  "message": "InvalidToken" }))
        done()
      })
      .catch(err => done(err))
  })

  it('send wrong token should response with status code 400', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', userToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "Lenovo ideapad",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : 8500000,
        stock       : 3
      })
      .then(result => {
        expect(result.status).toEqual(401)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({ "message": "Unauthorize user!" }))
        done()
      })
      .catch(err => done(err))
  })

  it('name empty should send response with status code 400 & message name validation error', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "",
        description : "Lenovo ideapad",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : 8500000,
        stock       : 3
      })
      .then(result => {
        expect(result.status).toEqual(400)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({ message : 'Validation notEmpty on name failed' }))
        done()
      })
      .catch(err => done(err))
  })

  it('description empty should send response with status code 400 & message description validation error', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : 8500000,
        stock       : 3
      })
      .then(result => {
        expect(result.status).toEqual(400)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({ message : 'Validation notEmpty on description failed' }))
        done()
      })
      .catch(err => done(err))
  })

  it('image_url empty should send response with status code 400 & message image_url validation error', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "Lenovo Ideapad",
        image_url   : "",
        price       : 8500000,
        stock       : 3
      })
      .then(result => {
        expect(result.status).toEqual(400)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({ message : 'Validation notEmpty on image_url failed' }))
        done()
      })
      .catch(err => done(err))
  })

  it('price empty should send response with status code 400 & message price validation error', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "Lenovo Ideapad",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : '',
        stock       : 3
      })
      .then(result => {
        expect(result.status).toEqual(400)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({ "message": "Validation notEmpty on price failed" }))
        done()
      })
      .catch(err => done(err))
  })

  it('when input number on field price less than 0 sholud send response with status code 400 & message price validation error', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "Lenovo Ideapad",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : -1,
        stock       : 3
      })
      .then(result => {
        expect(result.status).toEqual(400)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({ "message": "Validation min on price failed" }))
        done()
      })
      .catch(err => done(err))
  })

  it('when input wrong datatype on field price sholud send response with status code 500 & message price validation error', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "Lenovo Ideapad",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : 'INPUT_STRING_TO_FIELD_PRICE',
        stock       : 3
      })
      .then(result => {
        expect(result.status).toEqual(500)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({ "message": "Internal server error!" }))
        done()
      })
      .catch(err => done(err))
  })

  it('stock empty should send response with status code 400 & message stock validation error', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "Lenovo Ideapad",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : 50000,
        stock       : ''
      })
      .then(result => {
        expect(result.status).toEqual(400)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({ "message": "Validation notEmpty on stock failed"}))
        done()
      })
      .catch(err => done(err))
  })

  it('when input number on field stock less than 0 sholud send response with status code 400 & message stock validation error', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "Lenovo Ideapad",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : 50000,
        stock       : -1
      })
      .then(result => {
        expect(result.status).toEqual(400)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({ "message": "Validation min on stock failed" }))
        done()
      })
      .catch(err => done(err))
  })

  it('when input wrong datatype on field stock sholud send response with status code 500 & message stock validation error', done => {
    request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', adminToken)
      .auth('role', 'admin')
      .send({
        name        : "Lenovo",
        description : "Lenovo Ideapad",
        image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
        price       : 30000,
        stock       : 'INPUT_STRING_TO_FIELD_STOCK'
      })
      .then(result => {
        expect(result.status).toEqual(500)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toEqual(expect.objectContaining({ "message": "Internal server error!" }))
        done()
      })
      .catch(err => done(err))
  })
})

describe('Update /products/:id', () => {
  const adminToken = encodeToken({ 
    username: 'admin',
    email   : 'admin@mail.com',
    role    : 'admin'
  })

  describe('When success to update', () => {
    it('Update should send response with status code 200', done => {
      request(app)
        .put(`/products/${productId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .set('access_token', adminToken)
        .auth('role', 'admin')
        .send({
          name        : "Lenovo",
          description : "Lenovo Ideapad",
          image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
          price       : 1000,
          stock       : 1000
        })
        .then(result => {
          expect(result.status).toEqual(200)
          expect(typeof result.body).toEqual('object')
          expect(result.body).toHaveProperty('updated')
          done()
        })
        .catch(err => done(err))
    })
  })

  describe('Updating product with no access_token or valid token but not admin', () => {
    it('when no access_token it should send response with status code (400) Invalid token', done => {
      request(app)
        .put(`/products/${productId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // .set('access_token', adminToken)
        .auth('role', 'admin')
        .send({
          name        : "Lenovo",
          description : "Lenovo Ideapad",
          image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
          price       : 1000,
          stock       : 1000
        })
        .then(result => {
          expect(result.status).toEqual(400)
          expect(typeof result.body).toEqual('object')
          expect(result.body).toHaveProperty('message')
          expect(result.body)
            .toEqual(expect.objectContaining({ "message": "InvalidToken" }))
          done()
        })
        .catch(err => done(err))
    })

    it('when valid token but not admin role it should send response with status code (401) unauthorize', done => {
      const userToken = encodeToken({
        username  : "client",
        email     : "client@mail.com",
        role      : 'customer'
      })

      request(app)
        .put(`/products/${productId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .set('access_token', userToken)
        .auth('role', 'admin')
        .send({
          name        : "Lenovo",
          description : "Lenovo Ideapad",
          image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
          price       : 1000,
          stock       : 1000
        })
        .then(result => {
          expect(result.status).toEqual(401)
          expect(typeof result.body).toEqual('object')
          expect(result.body).toHaveProperty('message')
          expect(result.body)
            .toEqual(expect.objectContaining({ "message": "Unauthorize user!" }))
          done()
        })
        .catch(err => done(err))
    })
  })

  describe('Wrong Input on stock and price', () => {
    it('when update with input number on field stock less than 0 should send response with status code 400 & message validation error', done => {
      request(app)
        .put(`/products/${productId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .set('access_token', adminToken)
        .auth('role', 'admin')
        .send({
          name        : "Lenovo",
          description : "Lenovo Ideapad",
          image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
          price       : 50000,
          stock       : -1
        })
        .then(result => {
          expect(result.status).toEqual(400)
          expect(typeof result.body).toEqual('object')
          expect(result.body).toEqual(expect.objectContaining({ "message": "Validation min on stock failed" }))
          done()
        })
        .catch(err => done(err))
    })

    it('when update with input number on field price less than 0 should send response with status code 400 & message validation error', done => {
      request(app)
        .put(`/products/${productId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .set('access_token', adminToken)
        .auth('role', 'admin')
        .send({
          name        : "Lenovo",
          description : "Lenovo Ideapad",
          image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
          price       : -1,
          stock       : 50000
        })
        .then(result => {
          expect(result.status).toEqual(400)
          expect(typeof result.body).toEqual('object')
          expect(result.body).toEqual(expect.objectContaining({ "message": "Validation min on price failed" }))
          done()
        })
        .catch(err => done(err))
    })

    it('when update with wrong data type on field price should send response with status code 500 Internal Server Error', done => {
      request(app)
        .put(`/products/${productId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .set('access_token', adminToken)
        .auth('role', 'admin')
        .send({
          name        : "Lenovo",
          description : "Lenovo Ideapad",
          image_url   : "https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/10/11/0bba70bc-104f-42af-bd2d-49067a3e448d.jpg",
          price       : 'WRONG_DATA_TYPE',
          stock       : 50000
        })
        .then(result => {
          expect(result.status).toEqual(500)
          expect(typeof result.body).toEqual('object')
          expect(result.body).toEqual(expect.objectContaining({ "message": "Internal server error!" }))
          done()
        })
        .catch(err => done(err))
    })
  })
})

describe('Delete /products/:id', () => {
  const adminToken = encodeToken({ 
    username: 'admin',
    email   : 'admin@mail.com',
    role    : 'admin'
  })

  describe('When success delete', () => {
    it('should successfully get status 200', done => {
      request(app)
        .delete(`/products/${productId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .set('access_token', adminToken)
        .auth('role', 'admin')
        .then(result => {
          expect(result.status).toEqual(200)
          expect(typeof result.body).toEqual('object')
          expect(result.body).toHaveProperty('message')
          expect(result.body)
            .toEqual(expect.objectContaining({ "message": "Product has been delete!" }))
          done()
        })
        .catch(err => done(err))
    })
  })

  describe('When access_token is null', () => {
    it('should response with status code (400) with message Invalid Token', done => {
      request(app)
        .delete(`/products/${productId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .set('access_token', null)
        .auth('role', 'admin')
        .then(result => {
          expect(result.status).toEqual(400)
          expect(typeof result.body).toEqual('object')
          expect(result.body).toHaveProperty('message')
          expect(result.body)
            .toEqual(expect.objectContaining({ "message": "Invalid Token" }))
          done()
        })
        .catch(err => done(err))
    })
  })

  describe('When access_token is valid but role is not admin', () => {
    const userToken = encodeToken({
      username  : "client",
      email     : "client@mail.com",
      role      : 'customer'
    })

    it('should response with status code (401) with message Unauthorize user', done => {
      request(app)
        .delete(`/products/${productId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .set('access_token', userToken)
        .auth('role', 'admin')
        .then(result => {
          expect(result.status).toEqual(401)
          expect(typeof result.body).toEqual('object')
          expect(result.body).toHaveProperty('message')
          expect(result.body)
            .toEqual(expect.objectContaining({ "message": "Unauthorize user!" }))
          done()
        })
        .catch(err => done(err))
    })
  })
})