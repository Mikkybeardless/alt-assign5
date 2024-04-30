import {User} from "../database/schema/user.schema.js"
import {ErrorWithStatus} from "../exception/errorWithStatus.js"



export const getAllUsers = async (page = 1, limit = 10, query = null) => {
    try {
        
    const skip = (page - 1) * limit;
    const filter = query ? { name: { $regex: query, $options: "i" } } : {};
    const Users = await User.find(filter, {
        password: 0,
      })
      .skip(skip)
      .limit(limit);
    const total = await User.countDocuments(filter);
    return { data: Users , meta: { page, limit, total } };
  } catch (error) {
    console.log(error);
    throw new ErrorWithStatus(error.message, 500);
  }

}
