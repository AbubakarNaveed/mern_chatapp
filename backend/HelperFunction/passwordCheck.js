const bcrypt = require("bcryptjs");

const passwordCheck = async (password, typePassword) => {
  const check = await bcrypt.compareSync(password, user.password, (err) => {
    if (err) {
      return false;
    }
    return check;
  });
};
