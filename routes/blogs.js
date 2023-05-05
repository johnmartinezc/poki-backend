const { v4: uuidv4 } = require("uuid");
const express = require('express');
const router = express.Router();

//instantiate mongodb 
const { db } = require('../mongo');


//GET all blogs from database
router.get('/all', async function(req, res) {
    const blogs = await db()
    .collection('sample_blogs')
    .find({})
    .limit(10)
    .toArray(function(err, result){
        if (err) {
          res.status(400).send("error fetching blogs")
        } else {
          res.json(result);
        }
      }); 
      res.json({
        success:true,
        blogs: blogs
      });
      
  });

//GET one blog from database
  router.get('/get-one', async function(req, res) {
    const blogs = await db()
    .collection('sample_blogs')
    .find({})
    .limit(1)
    .toArray(function(err, result){
        if (err) {
          res.status(400).send("error fetching blogs")
        } else {
          res.json(result);
        }
      }); 
  
      res.json({
        success:true,
        blogs: blogs
      });
      
  });

//UPDATE one blog
router.post("/update-one/:blogTitle", async (req, res) => {
  const blogToUpdate = { 
    title: req.params.blogTitle,
    text: req.params.blogText
  };

  const updates = {
    title: req.body.title,
    text: req.body.text
  };

  await db()
  .collection("sample_blogs")
  .updateOne(blogToUpdate, updates);

  res.json({
    success: true,
    blog: blogTitle,
  });
});


//GET one blog from id search
  router.get('/get-one/:id', async function(req, res) {
    const blogs = await db()
    .collection('sample_blogs')
    .findOne({
        id:req.params.id
    })
      res.json({
        success:true,
        blogs: blogs
      });
  });

//POST new blog
  router.post('/create-one', async function(req, res, next) {
    const blogs = await db()
    .collection('sample_blogs')
    .insertOne({    
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        category: req.body.category,
        last_modified: new Date(),
        })

      res.json({
        success:true,
        blogs: blogs
      });
  });


router.get('/get-multi', async function(req, res, next) {
  // console.log(req.params.opt1)
  const blogs = await db()
  .collection('sample_blogs')
  .find({title: { $in: [req.query.opt1,req.query.opt2,req.query.opt3]}})
  .sort(
    {title: 1, blogs: 1}
  )
  .toArray()

    res.json({
      success:true,
      blogs: blogs
    });
})

//Delete blog by title
router.delete("/single/:blogTitle", async (req, res) => {
  let titleToDelete = { title: req.params.blogTitle };

  await db()
    .collection("sample_blogs")
    .deleteOne(titleToDelete, (err, _result) => {
      if (err) {
        res
          .status(400)
          .send(`Error deleting blog${titleToDelete.id}!`);
      } else {
        console.log("Blog deleted successfully");
        res.status(200).send(`${titleToDelete.id} deleted successfully`);
      }
    });

  res.json({
    success: true,
  });
});

router.get('/get-one/:title', async function(req, res) {
  const blogs = await db()
  .collection('sample_blogs')
  .findOne({
      title:req.params.titleToFind
  })
    res.json({
      success:true,
      blogs: blogs
    });
})

router.put('/update-one', async function(req, res) {
  const blogs = await db()
  .collection('sample_blogs')
  .updateOne({
      title:req.params.titleToFind
  })
    res.json({
      success:true,
      blogs: blogs
    });
})

router.delete('/delete-one', async function(req, res) {
  const blogs = await db()
  .collection('sample_blogs')
  .deleteOne({
      title:req.params.titleToFind
  })
    res.json({
      success:true,
      blogs: blogs
    });
})
  
module.exports = router;