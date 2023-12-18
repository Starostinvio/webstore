import { useCallback, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function UserProfileContainer() {
  const store = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  useInit(
    () => {
      store.actions.authentication.makeAuthenticatedRequest();
    },
    [],
    true
  );

  const select = useSelector((state) => ({
    serverError: state.authentication.serverError,
    sessionActive: state.authentication.sessionActive,
  }));
  const callbacks = {
    getToken: useCallback(
      () => store.actions.authentication.getToken(),
      [store]
    ),
  };

  useEffect(() => {
    if (select.serverError) {
      navigate("/login", { replace: true });
    }
  }, [select.serverError]);

  useEffect(() => {
    if (!callbacks.getToken())
      navigate("/login", {
        replace: false,
        state: { previousLocation: location },
      });
  }, [select.sessionActive]);

  return <>{select.sessionActive && <Outlet />}</>;
}

export default UserProfileContainer;
