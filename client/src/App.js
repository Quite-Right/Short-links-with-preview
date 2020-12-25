import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main"
import "./styles.scss";
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
