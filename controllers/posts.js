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
        console.log('Error in GET all pets route', err)
        res.status(503).send({ message: 'Error in finding pets' })
    })
})

// POST - create a new post as a user
router.post('/', (req, res) => {
    db.Post.create({
        author: req.user._id,
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
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
router.delete('/:postId', (req, res) => {
    db.Post.remove({
        author: req.user._id,
        _id: req.params.postId
    })
    .then(() => {
        console.log('Success in DELETE')
        res.send({ message: 'Successful DELETE'})
        res.status(200).send({ message: 'Success in DELETE'})
    })
    .catch(err => {
        console.log('Error when deleting a pet', err)
        res.status(500).send({ message: 'Server error'})
    })
})


module.exports = router