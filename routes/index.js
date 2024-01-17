var express = require('express');
var router = express.Router();
// const app=express();
const userModel=require('./users');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//crud using ejs, express generator,express(framework),and mongodb

//creation
router.get('/create',async function(req,res){
  let data=await userModel.create({
    username:"aradhana",
    email:"aradhanaswan3456@gmail.com",
    job:"student"
  })
  //we can insert further more data by using insertOne or inserMany method in mongodb
  //we can check it in console or send it as a response
  // console.log(data);
  res.send(data);
})

//read
router.get('/find',async function(req, res) {
  //^start,$end ..
  //(i)->case insensitive
  var regex=new RegExp("^Aradhana$",'i');
  let user=await userModel.find({username:regex});
  res.send(user);
});


//update
router.get('/update', async function(req, res) {
  try {
    let updatedUser = await userModel.updateOne(
      { job: "student" },
      { $set: { status: "intern" } }
    );

    // Check if the update was successful
    if (updatedUser.nModified > 0) {
      res.status(200).json({ message: "User status updated successfully" });
    } else {
      res.status(404).json({ message: "No user found with job 'student'" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete 
router.delete('/delete', async function(req, res) {
  try {
    let deletedUser = await userModel.deleteOne({ job: "student" });

    // Check if the deletion was successful
    if (deletedUser.deletedCount > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "No user found with job 'student'" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
