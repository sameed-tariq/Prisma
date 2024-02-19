import prisma from "../DB/db.config.js";

//fetch post
export const fetchPost = async (req, res) => {
  const posts = await prisma.post.findMany({
    include:{
        comment:{
            include:{
                user: {
                    select: {
                        name:true
                    }
                }
            }
        }
    },
    orderBy:{
        id: "desc"
    },
    where:{
        title: {
            startsWith: "Next"
        }
    }
  })
  return res.json({ status: 200, data: posts });
};

//find post
export const findPost = async (req,res) => {
    const postId = req.params.id
    const post = await prisma.post.findFirst({
        where: {
            id:Number(postId)
        }
    })
    if(post){
     return res.json({status: 200, data: post})       
    }
    else{
        return res.json({status: 400, message: "Post not Found!"})
    }
}

// create post
export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body
  const newPost = await prisma.post.create({
    data: {
        user_id: Number(user_id),
        title: title,
        description: description
    }
  })

  return res.json({
    status: 200,
    data: newPost,
    message: "Post created succesfully",
  })
   
}
//Update post

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { user_id, title, description } = req.body;

  await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
        user_id: Number(user_id),
        title: title,
        description: description
    },
  });

  return res.json({ status: 200, message: "post updated successfully!" });
};

//delete post

export const deletePost = async(req,res) => {
    const postId = req.params.id;
    await prisma.post.delete({
        where: {
            id:Number(postId)
        }
    })
    return res.json({status: 200, message:"Post deleted successfully!"})
}

//search post

export const searchPost = async(req,res) => {
    const query = req.query.q
    const posts = await prisma.post.findMany({
        where:{
            description:{
                contains:query
            }
        }
    })

    return res.json({status:200, data: posts})
}
