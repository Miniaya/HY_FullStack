const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes), 0)
    const favorite = blogs.find(blog => blog.likes === mostLikes)

    return favorite === undefined
        ? null
        : {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
        }
}

const mostBlogs = (blogs) => {
    const blogCount = _.countBy(blogs, 'author')
        
    const mapped = Object.keys(blogCount).map(key => { 
        return {
            author: key,
            blogs: blogCount[key]
        }
    })

    const mostBlogs = _.maxBy(mapped, 'blogs')

    return mostBlogs === undefined
        ? null
        : mostBlogs
}

const mostLikes = (blogs) => {
    const authorsAndLikes = blogs.map(blog => {
        return {
            author: blog.author,
            likes: blog.likes
        }
    })

    const grouped = _.groupBy(authorsAndLikes, 'author')

    const mapped = Object.keys(grouped).map(key => {
        return {
            author: key,
            likes: _.sumBy(grouped[key], 'likes')
        }
    })

    const mostLikes = _.maxBy(mapped, 'likes')

    return mostLikes === undefined
        ? null
        : mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}