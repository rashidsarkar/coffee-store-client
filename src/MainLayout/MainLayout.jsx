import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Pages/Footer/Footer";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CoffeeDataContext = createContext();

function MainLayout() {
  const [coffeeData, setCoffeeData] = useState([]);

  const fetchCoffeeData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/coffee");
      setCoffeeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoffeeData();
  }, []);

  const coffeeDataContextValue = {
    coffeeData,
    fetchCoffeeData,
  };

  return (
    <div className="mx-auto max-w-7xl">
      <CoffeeDataContext.Provider value={coffeeDataContextValue}>
        <NavBar />
        <Outlet />
        <Footer />
      </CoffeeDataContext.Provider>
    </div>
  );
}

export default MainLayout;
