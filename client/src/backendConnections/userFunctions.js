import axios from "axios";
axios.defaults.withCredentials = true;
export const userSignUp = async (email, password, userName) => {
  try {
    const res = await axios.post("http://localhost:8000/signUp", {
      email,
      password,
      userName,
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = async (email, password) => {
  try {
    const res = await axios.post("http://localhost:8000/signIn", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// export const userLogin = async (email, password) => {
//   try {

//     return a
//   } catch (error) {

//   }
// }

export const verifyUser = async () => {
  try {
    const res = await axios.get("http://localhost:8000/verify", {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserContactList = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8000/contacts/${id}`);
    console.log("ok");
    return res;
  } catch (error) {
    console.log(error);
  }
};
