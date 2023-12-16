import SideLayout from "../../components/side-layout";
import AuthButton from "../../components/auth-button";

import { useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileLink from "../../components/profile-link";

function AuthServices() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector((state) => ({
    token: state.authentication.token,
    userProfile: state.authentication.userProfile,
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
  };
  useEffect(() => {
    if (location.pathname === "/login") {
      select.token && navigate("/", { replace: false });
    }
  }, [select.token]);

  return (
    <SideLayout side="end" padding="small">
      {select.token ? (
        <>
          <ProfileLink userName={select.userProfile?.userName} />
          <AuthButton title="Выход" action={callbacks.removeToken} />
        </>
      ) : (
        <AuthButton title="Вход" />
      )}
    </SideLayout>
  );
}

export default AuthServices;
