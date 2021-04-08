const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
]

const listWithTwoBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 7,
        __v: 0
    }
]

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
})

describe('most liked blog', () => {

    test('when the list is empty is null', () => {
        expect(listHelper.favoriteBlog([])).toBe(null)
    })

    test('when the list contains one blog is itself', () => {
        const correct = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }

        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(correct)
    })

    test('of a bigger list is correct', () => {
        const correct = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }

        expect(listHelper.favoriteBlog(blogs)).toEqual(correct)
    })
})

describe('author with most blogs', () => {

    test('when the list is empty is null', () => {
        expect(listHelper.mostBlogs([])).toBe(null)
    })

    test('when the list contains one value is itself', () => {
        const correct = {
            author: "Edsger W. Dijkstra",
            blogs: 1
        }

        expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(correct)
    })

    test('list containing two blogs returns first', () => {
        const correct = {
            author: "Michael Chan",
            blogs: 1
        }

        expect(listHelper.mostBlogs(listWithTwoBlogs)).toEqual(correct)
    })

    test('list containing many blogs returns the most blogged', () => {
        const correct = {
            author: "Robert C. Martin",
            blogs: 3
        }

        expect(listHelper.mostBlogs(blogs)).toEqual(correct)
    })

})

describe('author with most likes', () => {
    test('when the list is empty is null', () => {
        expect(listHelper.mostLikes([])).toBe(null)
    })

    test('when the list contains one value is itself', () => {
        const correct = {
            author: "Edsger W. Dijkstra",
            likes: 5
        }

        expect(listHelper.mostLikes(listWithOneBlog)).toEqual(correct)
    })

    test('list containing two blogs returns first', () => {
        const correct = {
            author: "Michael Chan",
            likes: 7
        }

        expect(listHelper.mostLikes(listWithTwoBlogs)).toEqual(correct)
    })

    test('list containing many blogs returns most liked', () => {
        const correct = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }

        expect(listHelper.mostLikes(blogs)).toEqual(correct)
    })
})