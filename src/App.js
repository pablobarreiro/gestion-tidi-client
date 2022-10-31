import "./styles/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="max-container1">
        <div className="max-container2">
          <NavigationBar />
          <Home />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
