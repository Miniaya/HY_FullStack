describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Hemuli Muuminen',
      username: 'hemuli',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('hemuli')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Hemuli Muuminen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('hemuli')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain', 'Wrong username or password')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'hemuli', password: 'salainen' })
      })

      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.contains('Create new')
        cy.get('#title').type('new blog from cypress')
        cy.get('#author').type('totally not me')
        cy.get('#url').type('www.test.com')
        cy.get('#submit-button').click()

        cy.contains('new blog from cypress')
      })

      describe('when several blogs exist', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'first blog', author: 'not me', url: 'www.test.com' })
          cy.createBlog({ title: 'second blog', author: 'not me', url: 'www.test.com' })
          cy.createBlog({ title: 'third blog', author: 'not me', url: 'www.test.com' })
        })

        it('A blog can be liked', function() {
          cy.contains('show').click()
          cy.contains('like').click()
          cy.contains('likes 1')
        })

        it('A blog can be deleted', function() {
          cy.contains('show').click()
          cy.contains('remove').click()
          cy.contains('first blog').not()
        })

        it('blogs are sorted by likes', function() {
          cy.get('#blogs').as('allBlogs')
          cy.get('@allBlogs').then(() => {
            cy.get('.blogContent:first').should('contain', 'first blog')
            cy.get('.blogContent:last').should('contain', 'third blog')
          })

          cy.contains('first blog').parent().find('button').click()
          cy.contains('first blog').parent().find('#like-button').click()

          cy.contains('third blog').parent().find('button').click()
          cy.contains('third blog').parent().find('#like-button').click().as('likeButton')
          cy.get('@likeButton').click()

          cy.get('@allBlogs').then(() => {
            cy.get('.blogContent:first').should('contain', 'third blog')
            cy.get('.blogContent:last').should('contain', 'second blog')
          })
        })
      })
    })
  })
})