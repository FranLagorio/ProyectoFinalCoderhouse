const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    image: { type: String, required: false },
    // cart_id: { type: mongoose.Schema.ObjectId },
  },
  {
    versionKey: false,
  }
);

UserSchema.pre("save", function (next) {
  // const user = this;
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = function (password) {
  const user = this;
  const compare = bcrypt.compareSync(password, user.password);
  return compare;
};

module.exports = mongoose.model("Users", UserSchema);
