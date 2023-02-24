import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import NotFound from "./commons/NotFound";
import Login from "./components/Login";
import SingleProject from "./components/SingleProject";
import Loading from "./commons/Loading";
import EditGenerals from "./components/EditGenerals";
import Profile from "./components/Profile";
import Reports from "./components/Reports";

function App() {

  return (
    <>
      <div className="max-container1">
        <div className="max-container2">
          <NavigationBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/general" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports/*" element={<Reports />} />
            <Route path="/editGenerals" element={<EditGenerals />} />
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
