const request = require('supertest')
const app = require('../app')
const { encryptPassword } = require('../helpers/bcrypt')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll(done => {
  queryInterface.bulkInsert('Users', [
    {
      username  : "admin",
      email     : "admin@mail.com",
      password  : encryptPassword('admin123'),
      role      : "admin",
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ])
  done()
})

afterAll(done=> {
  User
    .destroy({ truncate: true, restartIdentity: true })
    .then(res => done())
    .catch(err => done(err))
})

//? Test login
describe('Test Login --> endpoint POST /login', () => {
  it('return response containing id, username, email, role & token', done => {
    return request(app)
      .post('/login')
      .send({ email: 'admin@mail.com', password: 'admin123' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        const { body, status } = res
        expect(status).toEqual(200)
        expect(typeof body).toEqual('object')
        expect(body)
          .toEqual(expect.objectContaining({
            id            : expect.any(Number),
            username      : 'admin',
            email         : 'admin@mail.com',
            role          : 'admin',
            access_token  : expect.any(String)
          }))
        done()
      })
      .catch(err => done(err))
  })

  it('email not in database should send response with status 404', done => {
    return request(app)
      .post('/login')
      .send({
        email     : "dummymail@dummy.com",
        password  : "dummy123"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(result => {
        expect(result.status).toEqual(404)
        expect(typeof result.body).toEqual('object')
        expect(result.body)
          .toEqual(expect.objectContaining({ message: expect.any(String) }))
        done()
      })
      .catch(err => done(err))
  })

  it('wrong password should send response with status 404', done => {
    return request(app)
      .post('/login')
      .send({
        email     : 'admin@mail.com',
        password  : "wrongpassword"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(result => {
        expect(result.status).toEqual(404)
        expect(typeof result.body).toEqual('object')
        expect(result.body)
          .toEqual(expect.objectContaining({ message: expect.any(String) }))
        done()
      })
      .catch(err => done(err))
  })

  it('email & password empty should send response with status 404', done => {
    return request(app)
      .post('/login')
      .send({
        email     : '',
        password  : ''
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(result => {
        expect(result.status).toEqual(404)
        expect(typeof result.body).toEqual('object')
        expect(result.body)
          .toEqual(expect.objectContaining({ message: expect.any(String) }))
        done()
      })
      .catch(err => done(err))
  })
})

  
