import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./commons/NotFound";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./state/user";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem('user_values')) {
      dispatch(getUser());
      navigate("/general");
    }
    else navigate("/login");
  }, []);
  console.log(user)

  if (!localStorage.getItem('user_values'))
    return (
      <>
        <Login />
      </>
    );

  return (
    <>
      <div className="max-container1">
        <div className="max-container2">
          <NavigationBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/general" element={<Home />} />
            <Route path="/project/:projectName" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
