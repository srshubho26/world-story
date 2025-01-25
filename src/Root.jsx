import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import 'react-toastify/dist/ReactToastify.css';
import PostProvider from "./providers/PostProvider";

function Root() {
  return (<PostProvider>
    <Header />

    <main className="pt-[65px] bg-white dark:bg-sec_title sm:pt-[92px]">
      <Outlet />
    </main>

    <Footer />
  </PostProvider>)
}

export default Root;