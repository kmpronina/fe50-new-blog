import { Route, Routes } from 'react-router-dom';
import { RouterLocationsEnum } from './Router';
import MainPage from '#pages/MainPage';
import BlogPage from '#pages/BlogPage';
import SignInPage from '#pages/SignInPage';
import SignUpPage from '#pages/SingUpPage';

// import NotFound404Page from '#pages/notFound404Page';

const RouterRoutes = () => {
  return (
    <Routes>
      <Route path="">
        <Route path={RouterLocationsEnum.main} Component={() => <MainPage />} />
        <Route path={RouterLocationsEnum.signIn} Component={SignInPage} />
        <Route path={RouterLocationsEnum.blogPage} Component={BlogPage} />
        <Route path={RouterLocationsEnum.signUp} Component={SignUpPage} />
        {/* <Route path="*" Component={NotFound404Page} /> */}
      </Route>
    </Routes>
  );
};
export default RouterRoutes;
