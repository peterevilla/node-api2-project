const express = require("express");
const Posts = require("../data/db.js");
const router = express.Router();

//GET POSTS
router.get("/", (req, res) => {
  console.log(req.query);
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: "The posts information could not be retrieved.",
      });
    });
});

//GET POSTS BY ID
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: " The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

// CREATE A NEW POST

router.post("/", (req, res) => {
  const postInfo = req.body;

  if (postInfo.title === "" || postInfo.contents === "") {
    res
      .status(400)
      .json({ errorMessage: "please provide title and contents for the post" });
  } else if (postInfo) {
    Posts.insert(postInfo)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        res.status(500).json({
          message: "There was an error saving the post to the database",
        });
      });
  }
});

//MODIFY A POST

router.put("/:id", (req, res) => {
  const changes = req.body;
  if (changes.title === "" || changes.contents === "") {
    res
      .status(400)
      .json({ errorMessage: "please provide title and contents for the post" });
  } else if (changes) {
    Posts.update(req.params.id, changes)
      .then((post) => {
        if (post === 1) {
          res.status(201).json(post);
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: "There was an error trying updating the post" });
      });
  }
});

//DELETE a POST

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((post) => {
      if (post > 0) {
        res.status(201).json({ message: "the post was deleted" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: " there was an error" });
    });
});

module.exports = router;
