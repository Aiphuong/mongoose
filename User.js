const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 150,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number`,
    },
  },
  email: {
    type: String,
    // required: true,
    lowercase: true,
    minlength: 8,
  },
  createAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updateAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  hobbies: [String],
  address: addressSchema,
});

userSchema.methods.sayHi = function () {
  console.log(`Hi my name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

userSchema.virtual("nameEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

userSchema.pre("save", function (next) {
  this.updateAt = Date.now();
  next();
  throw new Error("Fail save");
});

userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});
module.exports = mongoose.model("User", userSchema);
