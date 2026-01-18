import "./App.css";
import Footer from "./components/footer/Index"; 
import Header from "./components/header/Index";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans antialiased text-gray-900">
      <Header />
      
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;