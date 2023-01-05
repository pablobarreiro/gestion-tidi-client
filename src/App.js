import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import NotFound from "./commons/NotFound";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import SingleProject from "./components/SingleProject";
import Loading from "./commons/Loading";

function App() {

  return (
    <>
      <div className="max-container1">
        <div className="max-container2">
          <NavigationBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/general" element={<Home />} />
            <Route path="/project/:projectId" element={<SingleProject />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
