import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
     type: String,
     required: true
    },
  password: {
    type: String,
    required: true 
  ,}
});

const hashPassword = async (password: any) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  } catch (error) {
    return error;
  }
}

const User = mongoose.model('User', userSchema);

const runSeed = async () => {
  const PASSWORD = process.env.SHAREENERGY_PASSWORD;
  
  const hashedPassword = await hashPassword(PASSWORD);

  await User.deleteMany({});

  await User.insertMany({
    username: 'desafiosharenergy',
    password: hashedPassword,

  })
}

runSeed();


export default User;