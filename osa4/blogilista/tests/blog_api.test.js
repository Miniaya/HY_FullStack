const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salattu', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs´ indentification field is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

var token = ''

describe('adding new blog', () => {
    beforeEach(async () => {
        await api
            .post('/api/login')
            .send({
                username: 'root',
                password: 'salattu'
            })
            .then(response => {
                token = response.body.token
            })
            
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain('TDD harms architecture')
    })

    test('initial value for likes is zero', async () => {
        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const lastBlog = blogsAtEnd[helper.initialBlogs.length]

        expect(lastBlog.likes).toBe(0)
    })

    test('title and url can´t be undefined', async () => {
        const newBlog = {
            author: "Hemuli",
            likes: 13
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('can´t add a blog without token', async () => {
        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
        }

        await api
            .post('/api/blogs')
            .set('Authorization', '')
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deleting a blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await api
            .post('/api/login')
            .send({
                username: 'root',
                password: 'salattu'
            })
            .then(response => {
                token = response.body.token
            })
        
        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)

    })

    test('an existing blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            blogsAtStart.length - 1
        )

        const titles = blogsAtEnd.map(blog => blog.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating a blog', () => {
    test('an existing blog can be modified', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({
                title: blogToUpdate.title,
                author: blogToUpdate.author,
                url: blogToUpdate.url,
                likes: blogToUpdate.likes + 1
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 1)
    })
})

describe('when there is initially one user at db', () => {
    test('creation succeeds with unique username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'hemuli',
            name: 'Henna',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salasana'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

describe('adding a new user to the database', () => {

    test('user with too short username can´t be created', async () => {
        const usersAtStart = await helper.usersInDb()

        const shortUser = {
            username: 'my',
            name: 'Pikky Myy',
            password: 'punainen'
        }

        const result = await api
            .post('/api/users')
            .send(shortUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username`')
        expect(result.body.error).toContain('is shorter than the minimum allowed length')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user without username can´t be created', async () => {
        const usersAtStart = await helper.usersInDb()

        const noUsername = {
            name: 'Haisuli',
            password: 'roisto'
        }

        const result = await api
            .post('/api/users')
            .send(noUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password is missing', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mpeikko',
            name: 'Muumipeikko',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('invalid password')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password can´t be too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'nuuskis',
            name: 'Nuuskamuikkunen',
            password: 'no'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('invalid password')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})