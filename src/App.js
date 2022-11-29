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
import SingleProject from "./components/SingleProject";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log("USER",user)

  useEffect(() => {
    dispatch(getUser())
    .then(user => {
      if (user) {
        navigate("/general");
      }
      else navigate("/login");
    })
  }, []);

  return (
    <>
      <div className="max-container1">
        <div className="max-container2">
          { <NavigationBar /> }
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/general" element={<Home />} />
            <Route path="/project/:projectId" element={<SingleProject />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
