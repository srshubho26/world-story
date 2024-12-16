import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import 'react-toastify/dist/ReactToastify.css';

function Root() {
  return (<>
    <Header />

    <main className="pt-44 bg-white dark:bg-sec_title md:pt-36">
      <Outlet />
    </main>

    <Footer />
  </>)
}

export default Root;