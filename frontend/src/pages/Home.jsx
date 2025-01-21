import { useSelector } from "react-redux";
import { UserNotFound } from "../wedgets/UserNotFound/";
import { UserSignedIn } from "../wedgets/UserSignedIn/";
import { Header } from "../wedgets/Header/";

export const Home = () => {
  const userData = useSelector((state) => state.isSignedInUser);
  const isUserSignedIn = !!userData?.user;

  return isUserSignedIn ? <UserSignedIn Header={Header} /> : <UserNotFound />;
};
