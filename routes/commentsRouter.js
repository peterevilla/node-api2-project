const express = require("express");

const db = require("../data/db");

const router = express.Router();

router.get("/:id/comments", (req, res) => {
  db.findCommentById(req.params.id)
    .then((comment) => {
      if (comment) {
        res.status(201).json(comment);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "error on the request" });
    });
});

router.get("/comments/:id", (req, res) => {
  db.findPostComments(req.params.id)
    .then((comment) => {
      if (comment) {
        res.status(201).json(comment);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "error on the request" });
    });
});

module.exports = router;
