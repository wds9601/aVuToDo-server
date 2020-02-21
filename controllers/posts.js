let router = require('express').Router()
let db = require('../models')

// // JOURNAL POST ROUTES
// GET - retreive all posts belonging to logged-in user
router.get('/', (req, res) => {
    db.Post.find({ author: req.user._id })
    .then((posts) => {
        if (!posts) {
            return res.status(404).send({ message: 'No posts' })
        }
        else {
            res.status(200).send(posts)
        }
    })
    .catch(err => {
        console.log('Error in GET all posts route', err)
        res.status(503).send({ message: 'Error in finding posts' })
    })
})

// POST - create a new post as a user
router.post('/', (req, res) => {
    db.Post.create({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    })
    .then(newPost => {
        res.send({ newPost })
    })
    .catch(err => {
        console.log('Error in POST /posts route', err)
        res.status(500).send({ message: "Server error" })
    })
})

//GET Single Post? by ID



// PUT '/:id' - Edit content of a single post



// DELETE '/:id' - delete post from users list of posts
router.delete('/:id', (req, res) => {
    console.log('Author and ID', req.user.id, req.params.id)
    db.Post.deleteOne({
        // author: req.user.id,
        _id: req.params.id
    })
    .then(() => {
        console.log('Success in DELETE')
        res.status(200).send({ message: 'Successful DELETE'})
    })
    .catch(err => {
        console.log('Error when deleting a post', err)
        res.status(500).send({ message: 'Server error'})
    })
})


module.exports = router