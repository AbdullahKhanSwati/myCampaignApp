import bcrypt from "bcrypt"

export const hashPassword= async(password)=>{
try {
    const saltRound=10;
    const hashedPasssword = bcrypt.hash(password,saltRound);
    return hashedPasssword;
} catch (error) {
    console.log(error);
}
}

export const comparePassword = async(password,hashedPasssword)=>{
   return bcrypt.compare(password,hashedPasssword);
}