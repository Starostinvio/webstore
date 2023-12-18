import SideLayout from "../../components/side-layout";
import AuthButton from "../../components/auth-button";

import { useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileLink from "../../components/profile-link";
import selectCategories from "../../components/select-categories";

function AuthServices() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector((state) => ({
    userProfile: state.authentication.userProfile,
    sessionActive: state.authentication.sessionActive,
  }));

  const callbacks = {
    getToken: useCallback(
      () => store.actions.authentication.getToken(),
      [store]
    ),
    removeToken: useCallback(
      () => store.actions.authentication.removeToken(),
      [store]
    ),
    makeAuthenticatedRequest: useCallback(() => {
      store.actions.authentication.makeAuthenticatedRequest();
    }, [store]),
  };
  useEffect(() => {
    if (location.pathname === "/login") {
      callbacks.makeAuthenticatedRequest() && navigate("/", { replace: false });
    }
  }, [select.sessionActive]);

  return (
    <SideLayout side="end" padding="small" border="bottom">
      {select.sessionActive ? (
        <>
          <ProfileLink
            userName={select.userProfile?.userName}
            location={location}
          />
          <AuthButton title="Выход" action={callbacks.removeToken} />
        </>
      ) : (
        <AuthButton title="Вход" location={location} />
      )}
    </SideLayout>
  );
}

export default AuthServices;
