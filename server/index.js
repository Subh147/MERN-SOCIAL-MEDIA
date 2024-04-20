const express = require("express")
const app = express()
const bodyParser= require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const userRegModel = require("./clientRegModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const postModel = require("./PostModel")
const likemodel = require("./likeModel")
const commentModel = require("./commentModel")
const savePostModel = require("./savePost")
const multer = require ("multer")
const path = require("path")
const { request } = require("http")

PORT= 3000
app.use(bodyParser.json())
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true,
}))

// ----------------------------------------------------post storage setting
const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
      cb(null,"../client/public/images")
  },
  filename:(req,file,cb) =>{
      cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

//-------------------------------------post upload in multer
const upload = multer({
  storage:storage
})

var name 
//-------------------------------save post pic
app.post("/api/savePostPic",upload.single("file"),(req,res)=>{
  console.log("this is req.file",req.file.filename)
  console.log("check name",req.file.filename)
  postModel.findOneAndUpdate({postName:name},{postImg:req.file.filename})
  .then(()=>{
    console.log("image saved successfully")
  })
  .catch((err)=>{
    console.log("error during save post",err)
  })
})

//--------------------------------------save user pic in the post
app.post("/api/saveuserpic",(req,res)=>{
  const{postname,userpic} = req.body;
  postModel.findOneAndUpdate({postName:postname},{userPic:userpic})
  .then(()=>{
    console.log("userpic save to the post successfull ")
  })
  .catch((err)=>{
    console.log("error save to the post",err)
  })
})





// --------------------------------------------reg
app.post("/api/reg",(req,res)=>{
  
      const  {username,email,password}= req.body;

      const token = jwt.sign({ username: username ,email: email}, "secret");

      console.log(username,email,password)
      bcrypt.hash(password,10)
      .then((hashedPassword)=>{
        userRegModel.create({username,email,password:hashedPassword,token})
      .then(()=>{
        console.log("user Created")
        res.cookie("token",token)
        
        return res.json("User created successfully!")
      })
      .catch((err)=>{
        console.log("Error on user Creation",err)
        res.json("Faild to create User.")
      })
      })
      .catch((err)=>{
        console.log('error in hashing', err);
      })
})

// --------------------------------------------login



app.post("/api/login",(req,res)=>{
  var user
    const {username,password} = req.body
    userRegModel.findOne({username})
    .then((e)=>{
      console.log("found the user ", e)
      if(e !==null){
      user=e
      // compare password with the hashed one from database
      console.log("this is password",e.password)
      const bcryptPassword = e.password
      bcrypt.compare(password,bcryptPassword)
      .then((e)=>{
        console.log("login status",e)
        if(e){
          res.cookie("token",user.token)
        return res.json("Login successfully")
        }else{
          return res.json("Login unsuccessfully")
        }
      })
      .catch((err)=>{
        res.json("Invalid Password or Username")
        console.log("Invalid Password or Username",err)
      })
    }else{
      res.json("Invalid username or Password")
      console.log("User not found")
    }
    })
    .catch((err)=>{
      res.json("User not found")
      console.log("user not found",err)
    })
    console.log(username,password)
})








// -----------------------------------------------------search

app.post("/api/search",(req,res)=>{
  const {searchQuerry} = req.body
  console.log(searchQuerry)

  if(searchQuerry){
    userRegModel.find({username:searchQuerry})
    .then((e)=>{
      if(e){
        console.log("reasult",e)
        return res.json(e)
      }else{
        console.log("no result")
        return res.send("No such user exists!")
      }
    })
    .catch((err)=>console.log("error in searching..",err))
  }
  else{
    userRegModel.find({})
    .then((e)=>{
      if(e){
        console.log(e)
        return res.json(e)
      }else{
        return res.send("No such user exists!")
      }
    })
    .catch((err)=>console.log("error in searching..",err))
  }

  
})

// -------------------------------------------Post creation

app.post("/api/createPost",(req,res)=>{
  const {postname,username,modDate,userPic,sharedUser,sharedTime} =req.body
  name = postname
  console.log(req.body);
      postModel.create({postName:postname,userName:username,date:modDate,sharedUser,sharedTime,userPic})
      .then((e)=>{
        console.log("post created")
        return res.json(e)
      })
      .catch((err)=>{
        console.log("post not created",err)
      })
      // console.log(req.file.filename)
})

// -------------------------------------------Share Post
app.post("/api/sharePost",(req,res)=>{
  const {postname,username,modDate,userPic,sharedUser,sharedTime,img} =req.body
  name = postname
  console.log(req.body);
      postModel.create({postName:postname,userName:username,date:modDate,userPic,sharedUser,sharedTime,postImg:img})
      .then((e)=>{
        console.log("post created")
        return res.json(e)
      })
      .catch((err)=>{
        console.log("post not created",err)
      })
      // console.log(req.file.filename)
})

// -----------------------------------------Post show

app.get('/api/showPost', (req, res) => {
 postModel.find({})
 .then((posts)=>{
  res.json(posts)
 })
 .catch((err)=>{
  console.log('Error in getting posts : ', err);
 })
})

//---------------------------------------------------set userpic
app.post("/setuserpic",(req,res)=>{
  console.log(req.body)
  const {user, pic}= req.body;
  userRegModel.findOneAndUpdate({username:user},{profilePic:pic})
  .then(()=>{
    console.log("user pic success")
  })
  .catch((err)=>{
    console.log("error in setting profile picture ",err)
  })
})

// ---------------------------------------------------get userPic
app.post("/api/userPic",(req,res)=>{
  const {username} = req.body
  console.log("main username",username)
  userRegModel.findOne({username:username})
  .then((e)=>{
    //  console.log("get profilepic",e.profilePic)
     res.json(e)
     console.log("userimage found")
  })
  .catch((err)=>{
    console.log(err)
  })
})

var a= 0
// ----------------------------------------LIkes
app.post('/api/:postId/like', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await postModel.findById(postId);
    console.log(postId);
    // if(a===0){
    post.likes += 1;
    await post.save();
    a=a+1
    console.log("Liked");
    // }else{
      console.log("you already liked")
    // }
    return res.json({post,a});
    
    // if(a==1 ){
    //   const postId = req.params.postId;
    // const post = await postModel.findById(postId);
    // post.likes -= 1;
    // await post.save();
    
    // a=a-1
    // return res.json({post,a});

    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
});

//------------------------------------------set LikedUser
// app.post('/api/:userName/likeduser', async (req, res) => {
//   try {
//     const userName = req.params.userName
//     console.log(userName)
//     const post = await postModel.findOne({userName});
//     if (post.likedBy.includes(userName)) {
//       console.log("User already liked")
//       return res.status(400).json({ message: 'You have already liked this post' });
//     }else{
//       post.likedBy.push(userName);
//       await post.save();
//     }
    
//   } catch (error) {
//     console.error("error to track like",error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


//---------------------------------get user post
app.post('/api/userpost/',(req,res)=> {  
  const {username} = req.body
  postModel.find({userName:username})
  .then((posts)=>{
    res.send(posts)
  })
  .catch(()=>{
    console.log('error in getting posts')
  })
})

//--------------------------------------post Comment
app.post("/api/addcomment" , (req,res)=>{
  const {username,postId,comment,modDate} =req.body;
  console.log(username,postId,comment,modDate)
  commentModel.create({username,postId,comment,date:modDate})
  .then(data=>{
    console.log("comment created");
    res.send("comment post success")
  })
  .catch((err)=>{
    console.log("error to create comment",err)
  })
})
//--------------------------------------show comments 
app.post("/api/getcomment",(req,res)=>{
  const {postId} =req.body
  // console.log(postId,"is the id from getcomment")
  commentModel.find( {postId : postId} )
  .then((comments)=>{
    res.json(comments)
  })
  .catch((err)=>{
    console.log("Error in fetching comments ", err);
  })
})

// ------------------------------------Save post
app.post("/api/saved",(req,res)=>{
   const{elem,savePostUserName} = req.body
   const userName = elem.userName
   let postName = elem.postName
   let postImg = elem.postImg
   let date = elem.date
   let userPic = elem.userPic
   let likes= elem.likes
   

   savePostModel.findOne({postName,savePostUserName})
   .then((check)=>{
    if(!check){
      savePostModel.create({userName,postName,postImg,date,userPic,likes,savePostUserName})
      .then(()=>{
       console.log('save Post is done')
       res.send("Post Saved Successfully!")
      })
      .catch((err)=>{
       console.log("Error in saving a post",err)
       res.send("Error!  In Saving The Post")
      })
    }
    else{
      console.log("post already saved")
      res.send("Post Already Saved.")
    }
  })
  .catch((err)=>{
    console.log("Error in checking whether the post was saved or not",err)
  })
})

// -----------------------------------------Show saved post
app.post("/api/showsaved", (req, res) => {
  const {username} = req.body
  console.log(username)
  savePostModel.find({savePostUserName:username})
  .then((e)=>{
    res.json(e)
    console.log("get saved post",e)
  })
  .then((err)=>{
    console.log(err)
  })
})




mongoose.connect("mongodb+srv://bdey77185:1RyfFnYIT4rVwmIg@cluster0.58uskuj.mongodb.net/socialmedia?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("DB Connected")
    app.listen(PORT || 5000, () => {    
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch(()=>{
    console.log("Error on Connecting to DB")
})




