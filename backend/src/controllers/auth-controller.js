const { getAuth: auth } = require("firebase-admin/auth");

const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} = require("firebase/auth");

const getUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const userRecord = await auth().getUser(uid);
    await res.status(200).json(userRecord);
  } catch (err) {
    res.status(500).send(err);
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password, lastName, firstName } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(response.user, {
      displayName: `${firstName} ${lastName}`,
    });

    const user = response.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);

    const user = response.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const signOutUser = async (req, res) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    // res.redirect('/login');
    res.status(200).json({ message: "SignOut successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getUser,
  registerUser,
  loginUser,
  signOutUser,
};
