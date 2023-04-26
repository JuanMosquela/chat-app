import jwt from "jsonwebtoken";

console.log(process.env.JWT_SECRET_KEY);

const generateToken = async (id: any) => {
  try {
    const token = await jwt.sign({ id }, `${process.env.JWT_SECRET_KEY}`, {
      expiresIn: "24h",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;
