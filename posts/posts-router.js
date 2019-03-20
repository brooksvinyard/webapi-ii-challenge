const express = require('express');

const DB = require('../data/db.js');

const router = express.Router();

// Handles urls beginning with /api/posts
// GET request to /api/posts
router.get('/', async (req, res) => {
    try {
      const post = await DB.find(req.query);
      res.status(200).json(post);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The posts information could not be retrieved.',
      });
    }
});
  
router.get('/:id', async (req, res) => {
try {
    const post = await DB.findById(req.params.id);
    if (post.length === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    } else {
        res.status(200).json(post);
    }
} catch (error) {
    console.log(error);
    res.status(500).json({
    message: 'The post information could not be retrieved.',
    });
}
});

// POST request to /api/posts
router.post('/', async (req, res) => {
try {
    const post = await DB.insert(req.body);
console.log(post);
    if( !req.body.title || !req.body.contents ) {
        res.status(400).json({message: 'Please provide title and contents for the post.'});
    } else {
        res.status(201).json(post);
    }
} catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
    message: 'There was an error while saving the post to the database',
    });
}
});

// DELETE request to /api/posts/:id
router.delete('/:id', async (req, res) => {
try {
    const count = await DB.remove(req.params.id);
    if (count > 0) {
    res.status(200).json({ message: 'The post has been deleted' });
    } else {
    res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
} catch (error) {
    console.log(error);
    res.status(500).json({
    message: 'The post could not be removed',
    });
}
});

// PUT request to /api/posts/:id
router.put('/:id', async (req, res) => {
try {
    const post = await DB.update(req.params.id, req.body);

    if (!req.params.id) {
        res.status(500).json({message: 'The post with the specified ID does not exist.'});
    } else if (!req.body.title || !req.body.contents ) {
        res.status(400).json({message: 'Please provide title and contents for the post.'});
    } else if(post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({message: 'post not found'});
    }

} catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
    message: 'The post information could not be modified.',
    });
}
});

module.exports = router;