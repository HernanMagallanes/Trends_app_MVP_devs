// const { Student, Profile, Academic, Info } = require("../db");
// const user = await Student.findOne({
//   attributes: [],
//   include: [
//     {
//       model: Profile,
//       where: {
//         name: "Juan",
//       },
//     },
//     {
//       model: Info,
//     },
//     {
//       model: Academic,
//     },
//   ],
// });
const { NODE_ENV } = require("../../config");
const validateUser = require("../controllers/login.controller");
const registerUser = require("../controllers/register.controller");
const { verifyToken } = require("../helpers/jwt");

const register = async (req, res) => {
  //FALTAN LAS VALIDACIONES
  const { type, profile, academic, info } = req.body;
  try {
    const token = await registerUser({ type, profile, academic, info });
    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(201).json("User registered successfully.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { type, email, password } = req.body;
  try {
    const token = await validateUser({ email, password, type });
    if (!token) throw new Error("Incorrect credentials.");
    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });
    // res.status(200).json("Login successfully.");
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, logout };
