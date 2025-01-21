import { userSignedOut } from "../../../../app/reducers/isSignedInUser.js";
import { showToast } from "../../../../shared/ui/Toast/";
import { apiUser } from "../../../../shared/api/api_user/api-user.js";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

export const useSignOut = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { SIGNOUT_URL, HEADERS } = apiUser;

  const onSignOut = async () => {
    try {
      let response = await fetch(SIGNOUT_URL, {
        method: "POST",
        headers: HEADERS,
      });

      let userSignedOutNow = await response.json();

      dispatch(userSignedOut());
      showToast(toast, "success", "Account signed out.");
    } catch (e) {
      console.error(`error ${e}`);
    }
  };

  return { onSignOut };
};
