import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Login from "./pages/login";
import Register from "./pages/register";

const App = () => {
  return (
    <div className="bg-dark-08 text-white min-h-screen flex flex-col relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.03),transparent_50%)] pointer-events-none" />

      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.02),transparent_50%)] pointer-events-none"></div>

      <Header />

      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
