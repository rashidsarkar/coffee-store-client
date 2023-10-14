import { useContext } from "react";
import swal from "sweetalert";
import { CoffeeDataContext } from "../MainLayout/MainLayout";
import axios from "axios";
import { Link } from "react-router-dom";

function CoffeeCard({ fetchCoffeeData, coffee }) {
  const { coffeeName, _id, availableQuantity, supplier, taste, photo } =
    coffee || {};

  const handleRemove = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this coffee!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/coffee/${_id}`)
          .then((res) => {
            console.log(res.data);

            fetchCoffeeData();

            swal("Success", "Coffee deleted successfully!", "success");
          })
          .catch((err) => {
            console.log(err);
            swal(
              "Error",
              "An error occurred while deleting the coffee.",
              "error"
            );
          });
      } else {
        swal("Coffee is safe!");
      }
    });
  };

  return (
    <div className="shadow-xl card card-side bg-base-100">
      <figure className="w-60">
        <img src={photo} alt="Coffee" />
      </figure>
      <div className="flex justify-between w-full px-5 py-2">
        <div>
          <h2 className="card-title"> {coffeeName}</h2>
          <p>Available Quantity: {availableQuantity} </p>
          <p>Supplier: {supplier} </p>
          <p>Taste: {taste}</p>
        </div>
        <div className="justify-end card-actions">
          <div className="space-y-4 join join-vertical">
            <button className="btn join-item">View</button>
            <Link to={`/updateCoffee/${_id}`} className="btn">
              <button className="btn join-item">Edit</button>
            </Link>
            <button onClick={handleRemove} className="btn join-item">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoffeeCard;
