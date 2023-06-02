import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./components/Form/Signup";
import SignIn from "./components/Form/Signin";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Welcome from "./components/Main/Welcome";
import Mail from "./components/Pages/Mail";
import Sentbox from "./components/Pages/Sentbox";
import { useSelector } from "react-redux";
import Inbox from "./components/Pages/Inbox";
import ViewMail from "./components/Pages/Viewmail";

function App() {
  const router=createBrowserRouter([
    {path:'/', element:<SignIn />},
    {path:'/signup',element:<SignUp />},
    {path:'/welcome',element:<Inbox />},
    {path:'/mail',element:<Mail /> },
    {path:'/sentbox',element:<Sentbox />},
    {path:'welcome/viewmail:id',element:<ViewMail />}
    // {path:'/inbox',element:<Inbox />}
  ])
  const isLogin = useSelector(state => state.auth.isLogin)
  console.log('isLogin',isLogin);
  return (
    <div>
   <RouterProvider router={router}/>
    </div>
  )
}
export default App;
