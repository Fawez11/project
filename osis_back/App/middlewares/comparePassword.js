import User from "../models/user.js";

const comparePassword = async (req, res, next) => {
  try {
    const { body, user } = req;
    const { password } = body; //i'll figure out how to get it from body
    const { id } = user;
    const loggedInUser = await User.findByPk(id);
    if (!loggedInUser) return;
    const response = await loggedInUser.validPassword(password);
    if (!response)
      return res.status(401).json({ message: "Mot de passe incorrect" });
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default comparePassword;
