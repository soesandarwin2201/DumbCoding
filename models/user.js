import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
     username: {
          type: String,
          require: [true, 'Username is required!'],
          match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
     },
       email: {
         type: String,
         required: [true, 'Email already exists!'],
         unique: [true,'Email is required!'],
       },
       image: {
          type: String,
       }
     });

const User = models.User || model("User", userSchema);

export default User;