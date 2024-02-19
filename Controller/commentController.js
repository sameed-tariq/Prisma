import prisma from "../DB/db.config.js";

//fetch comments
export const fetchComment = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
        user: true,
        post:{
            include:{
                user:true
            }
        }
    }
  });
  return res.json({ status: 200, data: comments });
};

//find comment
export const findComment = async (req, res) => {
  const commentId = req.params.id;
  const comment = await prisma.comment.findFirst({
    where: {
      id: Number(commentId),
    },
  });
  if (comment) {
    return res.json({ status: 200, data: comment });
  } else {
    return res.json({ status: 400, message: "Comment not Found!" });
  }
};

// create comment
export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;
  
  await prisma.post.update({
    where:{
        id:Number(post_id),
    },
    data: {
        comment_count:{
            increment:1
        }
    }
  })

  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment: comment,
    },
  });

  return res.json({
    status: 200,
    data: newComment,
    message: "Comment created succesfully",
  });
};

//Update comment

export const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { user_id, post_id, comment } = req.body;

  await prisma.comment.update({
    where: {
      id: Number(commentId),
    },
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment: comment,
    },
  });

  return res.json({ status: 200, message: "Comment updated successfully!" });
};

//delete comment

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  await prisma.post.update({
    where:{
        id:Number(post_id),
    },
    data: {
        comment_count:{
            decrement:1
        }
    }
  })

  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });
  return res.json({ status: 200, message: "Comment deleted successfully!" });
};
