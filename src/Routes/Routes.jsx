import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Auth from '../modules/User/Pages/Auth/Auth';
import UpdateProfile from '../modules/User/Pages/UpdateProfile/UpdateProfile';

import { useAuth } from '../modules/User/context/AuthContext';
import Quiz from '../modules/Quiz/pages/Quiz';
import Home from '../pages/Home';
import HomeMain from '../pages/Home/HomeMain';
import QuizResult from '../modules/Quiz/pages/QuizResult';
import CourseLesson from '../modules/Course/pages/CourseLesson';
import LessonDetail from '../modules/Course/pages/LessonDetail';
import CurrentProfile from '../modules/User/Pages/UpdateProfile/CurrentProfile';

const Routers = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route exact path="/auth" element={!user ? <Auth /> : <Navigate to={'/'} />} />
      <Route exact path="/" element={user ? <Home /> : <Navigate to={'/auth'} />}>
        <Route exact path="/" element={<HomeMain />} />
        <Route exact path="auth/update" element={<UpdateProfile />} />
        <Route exact path="auth/profile" element={<CurrentProfile />} />
        <Route exact path="quiz" element={<Quiz />} />
        <Route exact path="quiz-result" element={<QuizResult />} />
        <Route exact path="courseLesson" element={<CourseLesson />} />
        <Route exact path="lessonDetail" element={<LessonDetail />} />
      </Route>
    </Routes>
  );
};

export default Routers;

