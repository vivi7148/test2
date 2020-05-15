const mongoose = require("mongoose");

// import author model
const Author = mongoose.model("author");

    
// function to handle a request to get all authors
const getAllAuthors = async (req, res) => {
  authors = []  
  try {
    const all_authors = await Author.find();
    
    return res.send(all_authors);

  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};
    
  
  

// function to modify author by ID
const updateAuthor = async (req, res) => {
  const authorId = req.params.id;
  const new_author = req.body;
  
  console.log("here man", authorId, new_author);
  //console.log(req);

  try {
    const authors = await Author.find({id: authorId});
    if (!authors) {
      res.status(400);
      console.log("Author not found");
      return res.send("Author not found");
    }
    
    const author = authors[0];
    console.log("Author found!!!", author);
    
    author["first_name"] = new_author["first_name"];
    author["last_name"] = new_author["last_name"];
    
    console.log("Updated ", author);
    
    return res.send(await author.save());
  } catch (err) {
    res.status(400);
    console.log(err);
    return res.send("Database query failed");
  }
};

// function to add author
const addAuthor = async (req, res) => {
    const new_author = req.body;
    const author = new Author(new_author);

    try {
        await author.save();
        return res.send(author);
    } 
    catch (err) {
        res.status(400);
        return res.send("Database query failed");
    }
};

// function to get author by id
const getAuthorByID = async (req, res) => {
  const authorId = req.params.id;
  
  console.log("getting author by id", authorId);

  try {
    const authors = await Author.find({id: authorId});
    if (!authors) {
      res.status(400);
      console.log("Author not found");
      return res.send("Author not found");
    }
    
    const author = authors[0];
    console.log("Author found!!!", author);
    
    
    return res.json(author);
  } catch (err) {
    res.status(400);
    console.log(err);
    return res.send("Database query failed");
  }
};

// remember to export the functions
module.exports = {
  getAllAuthors,
  getAuthorByID,
  addAuthor,
  updateAuthor
};
