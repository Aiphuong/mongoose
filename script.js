const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect(
  "mongodb://localhost/testdb",
  () => {
    console.log("connected");
  },
  (e) => console.error(e)
);

run();

async function run() {
  try {
    const findUser = await User.findOne({ name: "ABC" });
    await findUser.save();
    console.log(findUser.nameEmail);

    // const findUser = await User.where("age")
    //   .gt("12")
    //   .where("name")
    //   .equals("ABC")
    //   .populate("bestFriend")
    //   .limit(1);

    //   .select("age");

    // findUser[0].bestFriend = findUser[0].bestFriend.concat(
    //   "6245ce23e625dca994cd2794"
    // );
    // await findUser[0].save();

    // const user = await User.create({
    //   name: "ABC",
    //   age: 27,
    //   email: "TEST@test.com",
    //   hobbies: ["Reading book", "listening music"],
    //   address: {
    //     street: "Main st",
    //     city: "KD",
    //   },
    // });

    //   const user = new User({ name: "ABC", age: 26 });
    //   user.name = "Phuong";
    //   await user.save();
    console.log("user: ", findUser);
    // findUser.sayHi();
  } catch (e) {
    console.log(e.message);
  }
}
