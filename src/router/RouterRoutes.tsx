import { Route, Routes } from "react-router-dom";
import { RouterLocationsEnum } from "./Router";
import MainPage from "#pages/MainPage";
import BlogPage from "#pages/BlogPage";
import SignInPage from "#pages/SignInPage";
import SignUpPage from "#pages/SingUpPage";
import { useAppSelector } from "#store/store";

// import NotFound404Page from '#pages/notFound404Page';

const RouterRoutes = () => {
  const { accessToken } = useAppSelector((state) => state.userReducer);

  return (
    <Routes>
      <Route path="">
        <Route path={RouterLocationsEnum.main} Component={() => <MainPage />} />
        <Route path={RouterLocationsEnum.signIn} Component={SignInPage} />
        <Route path={RouterLocationsEnum.signUp} Component={SignUpPage} />
        {accessToken && (
          <Route path={RouterLocationsEnum.blogPage} Component={BlogPage} />
        )}
        {/* <Route path="*" Component={NotFound404Page} /> */}
      </Route>
    </Routes>
  );
};
export default RouterRoutes;
