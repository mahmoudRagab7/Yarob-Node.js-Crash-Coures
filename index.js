const express = require("express");
const mongoose = require("mongoose");

const app = express();

// mongodb+srv://mahmoudRagab:<password>@myfirstnodejscluster.rtsi8ox.mongodb.net/?retryWrites=true&w=majority&appName=myFirstNodeJsCluster

const Article = require("./models/article");

mongoose
  .connect(
    "mongodb+srv://mahmoudRagab:ziko123456789@myfirstnodejscluster.rtsi8ox.mongodb.net/?retryWrites=true&w=majority&appName=myFirstNodeJsCluster"
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("Error wwith conneting with DB " + err);
  });

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello in node js project");
});

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.get("/numbers", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }
  //   res.send(`the numbers are ${numbers}`);

  //   res.sendFile(__dirname + "/views/numbers.html");

  res.render("numbers.ejs", {
    name: "Mahmoud",
    numbers: numbers,
  });
});

app.get("/findSummation/:num1/:num2", (req, res) => {
  console.log(req.params);
  const { num1, num2 } = req.params;
  //   console.log(num1, num2);
  res.send(`the sum is ${Number(num1) + Number(num2)}`);
});

app.get("/sayHello", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  //   res.send(`Hello ${req.body.name} , Your Age is: ${req.query.age}`);

  res.json({
    name: req.body.name,
    age: req.query.age,
    language: "Arabic",
  });
});

app.put("/test", (req, res) => {
  res.send("ypu visited test");
});

app.post("/addComment", (req, res) => {
  res.send("post request on add comment");
});

app.delete("/testingDelete", (req, res) => {
  res.send("delete request");
});

// Articles Endpoints
app.post("/articles", async (req, res) => {
  const newArticle = new Article();

  const artTitle = req.body.articleTitle;
  const artBody = req.body.articleBody;
  //   console.log(artTitle,artBody);

  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLikes = 0;

  // newArticle.save().then(()=>{
  //     res.send("articles");
  // })

  await newArticle.save();
  //   res.send("the new article has been stored");
  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  //   console.log("-------" + articles);

  res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const articles = await Article.findById(id);
    res.json(articles);
  } catch (error) {
    console.log("error while reading id " + id);
    res.send("error");
  }
});

app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const articles = await Article.findByIdAndDelete(id);
    res.json(articles);
  } catch (error) {
    console.log("error while reading id " + id);
    // res.send("error");
    res.json(error);
  }
});

app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();
  res.render("articles.ejs", {
    allArticles: articles,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
