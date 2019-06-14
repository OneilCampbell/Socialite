const express = require("express");
const app = express();
const PORT = process.env.PORT || 4566;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const path = require('path');
// app.use("/", express.static("./build/"));
app.use(express.static(__dirname + "/"));

const { User, Post, Comment } = require("./models/models");

app.get("/users", async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.json(allUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
})

app.get("/users/:id", async (req,res) => {
    try {
        const thisUser = await User.findByPk(req.params.id);
        res.json(thisUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
})

app.post("/users", async (req,res) => {
  try {
      await User.create(req.body);
      res.send(true);
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: error.message
      });
  }
})

app.get("/posts", async (req, res) => {
    try {
        const allPosts = await Post.findAll({order: [['updatedAt', 'DESC']]});
        res.json(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
});

app.get("/posts/:userId", async (req, res) => {
    try {
        const thisUsersPosts = await Post.findAll({ 
            where: { userId: req.params.userId }, 
            order:[ ['updatedAt', 'DESC'] ] 
        });
        res.json(thisUsersPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
});

app.post("/posts", async (req, res) => {
    try {
        await Post.create(req.body);
        res.send(true);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
});

app.put("/posts/:id", async (req, res) => {
    try {
        const postToUpdate = await Post.findByPk(req.params.id);
        await postToUpdate.update(req.body);
        res.send(true);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const postToRemove = await Post.findByPk(req.params.id);
        await postToRemove.destroy();
        res.send(true);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
});

app.get("/comments", async (req, res) => {
  try {
      const allComments = await Comment.findAll({ order: [['updatedAt', 'DESC']] });
    res.json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

app.get("/comments/:id", async (req, res) => {
    try {
        const thisComment = await Comment.findByPk(req.params.id);
        res.json(thisComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
});

app.get("/comments/post/:postId", async (req, res) => {
  try {
      const thisPostsComments = await Comment.findAll({ where: { postId: req.params.postId }, order: [['updatedAt', 'DESC']] });
      res.json(thisPostsComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

app.post("/comments", async (req, res) => {
  try {
    await Comment.create(req.body);
    res.send(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

app.put("/comments/:id", async (req, res) => {
  try {
    const commentToUpdate = await Comment.findByPk(req.params.id);
    await commentToUpdate.update(req.body);
    res.send(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

app.delete("/comments/:id", async (req, res) => {
  try {
    const commentToRemove = await Comment.findByPk(req.params.id);
    await commentToRemove.destroy();
    res.send(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

// if (process.env.NODE_ENV == "production") {
//     app.get("/*", function(request, response) {
//       response.sendFile(path.join(__dirname, "build", "index.html"));
//     });
//   }

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join("build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
