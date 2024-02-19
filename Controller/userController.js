import prisma from "../DB/db.config.js";

//fetch user
export const fetchUser = async (req, res) => {
  const users = await prisma.user.findMany({
  select: {
    _count: {
      select: {
        post: true,
        comment:true
      }
    }
  }
  });
  return res.json({ status: 200, data: users });
};

//find user
export const findUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
  if (user) {
    return res.json({ status: 200, data: user });
  } else {
    return res.json({ status: 400, message: "User not Found!" });
  }
};

// create user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!findUser) {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return res.json({
      status: 200,
      data: newUser,
      message: "User created succesfully",
    });
  } else {
    return res.json({
      status: 400,
      message: "Email is already taken use another email.",
    });
  }
};

//Update User

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({ status: 200, message: "User updated successfully!" });
};

//delete user

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  return res.json({ status: 200, message: "User deleted successfully!" });
};
