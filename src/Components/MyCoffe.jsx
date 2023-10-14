import { useContext, useState, useEffect } from "react";

import { CoffeeDataContext } from "../MainLayout/MainLayout";
import CoffeeCard from "./CoffeCard";

function MyCoffee() {
  const { coffeeData, fetchCoffeeData } = useContext(CoffeeDataContext);
  const [coffeeOnDB, setCoffeeOnDB] = useState([]);

  useEffect(() => {
    if (coffeeData) {
      setCoffeeOnDB(coffeeData);
    }
  }, [coffeeData]);

  return (
    <div className="m-20">
      <h2 className="my-20 text-5xl text-center text-purple-600">Hot Coffee</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {coffeeOnDB?.map((coffee) => (
          <CoffeeCard
            key={coffee._id}
            coffee={coffee}
            fetchCoffeeData={fetchCoffeeData}
          />
        ))}
      </div>
    </div>
  );
}

export default MyCoffee;
