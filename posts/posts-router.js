const express = require('express');

const DB = require('../data/db.js');

const router = express.Router();

// Handles urls beginning with /api/posts
router.get('/', async (req, res) => {
    try {
      const post = await DB.find(req.query);
      res.status(200).json(post);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    }
});
  
router.get('/:id', async (req, res) => {
try {
    const post = await DB.findById(req.params.id);

    if (post) {
    res.status(200).json(post);
    } else {
    res.status(404).json({ message: 'post not found' });
    }
} catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
    message: 'Error retrieving the post',
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

router.delete('/:id', async (req, res) => {
try {
    const count = await DB.remove(req.params.id);
    if (count > 0) {
    res.status(200).json({ message: 'The post has been deleted' });
    } else {
    res.status(404).json({ message: 'The post could not be found' });
    }
} catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
    message: 'Error removing the post',
    });
}
});

router.put('/:id', async (req, res) => {
try {
    const post = await DB.update(req.params.id, req.body);
    if (post) {
    res.status(200).json(post);
    } else {
    res.status(404).json({ message: 'The post could not be found' });
    }
} catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
    message: 'Error updating the post',
    });
}
});

router.get('/:id/messages', async (req, res) => {
    try {
        const messages = await DB.findHubMessages(req.params.id);

        if(messages && messages.length > 0) {
            res.status(200).json(messages);
        } else {
            res.status(404).json({message: 'No message for this post'});
        }
    } catch(error) {
        res.status(500).json({message: 'error getting the messages for this post'});
    }
})

module.exports = router;