import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import 'react-toastify/dist/ReactToastify.css';
import PostProvider from "./providers/PostProvider";
import AuthProvider from "./providers/AuthProvider";

function Root() {
  return (<PostProvider>
    <AuthProvider>
      <Header />

      <main className="pt-[65px] bg-white dark:bg-sec_title sm:pt-[92px]">
        <Outlet />
      </main>

      <Footer />
    </AuthProvider>
  </PostProvider>)
}

export default Root;