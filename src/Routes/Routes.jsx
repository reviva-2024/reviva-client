import { createBrowserRouter } from "react-router-dom";
import SignIn from "../modules/User/Pages/SignIn/SignIn";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1>From Home</h1>
    },
    {
        path: "/signIn",
        element: <SignIn />
    }
])

export default routes;