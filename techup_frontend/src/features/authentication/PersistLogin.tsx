import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useSelector } from "react-redux";
import { RootState } from "../../store"
import { Outlet } from "react-router";
import Spinner from "../../ui/Spinner";
import { FullPage } from "../../ui/FullPage";

function PersistLogin (){
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const [ persist ] = useLocalStorageState("persist", false);
  const { user } = useSelector((store: RootState) => store.auth);

  useEffect(function () {
    let isMounted = true;

    console.log("Usman")
    async function verifyRefreshToken () {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    !user?.access && persist ? verifyRefreshToken() : setIsLoading(false);
    return function cleanup() {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {!persist ? <Outlet/> : isLoading ?
      <FullPage>
        <Spinner />
      </FullPage> : <Outlet/>}
    </>
  );
};

export default PersistLogin;
