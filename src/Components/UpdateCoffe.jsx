import { useParams } from "react-router-dom";
import { CoffeeDataContext } from "../MainLayout/MainLayout";
import { useContext } from "react";
import swal from "sweetalert";

function UpdateCoffe() {
  const { coffeeData, fetchCoffeeData } = useContext(CoffeeDataContext);

  const { id } = useParams();
  // Find the coffee to update using the 'id' parameter
  const coffeForUpdate = coffeeData.find((coffe) => coffe._id === id);

  const {
    coffeeName,
    availableQuantity,
    supplier,
    taste,
    category,
    details,
    photo,
    _id,
  } = coffeForUpdate || {};
  const handleUpdateCoffe = (e) => {
    e.preventDefault();
    // Create a new FormData object from the form
    const form = new FormData(e.currentTarget);
    // Get the values from the form fields
    const coffeeName = form.get("coffeeName");
    const availableQuantity = form.get("availableQuantity");
    const supplier = form.get("supplier");
    const taste = form.get("taste");
    const category = form.get("category");
    const details = form.get("details");
    const photo = form.get("photo");
    const updatecoffeeData = {
      coffeeName,
      availableQuantity,
      supplier,
      taste,
      category,
      details,
      photo,
    };
    fetch(`http://localhost:5000/coffee/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatecoffeeData),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchCoffeeData();
        swal("Success", "Coffee Update successfully!", "success");
      });

    // Send the coffeeData to your server (update the URL accordingly)
  };

  return (
    <div>
      <div className="min-h-screen bg-[#F4F3F0] p-24">
        <h2 className="text-3xl font-black">Update Coffee for {coffeeName}</h2>
        <form onSubmit={handleUpdateCoffe}>
          {/* Coffee name and quantity */}
          <div className="md:flex">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Coffee Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="coffeeName"
                  placeholder="Coffee Name"
                  className="w-full input input-bordered"
                  defaultValue={coffeeName}
                />
              </label>
            </div>
            <div className="w-full ml-4 form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Available Quantity</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="availableQuantity"
                  placeholder="Available Quantity"
                  className="w-full input input-bordered"
                  defaultValue={availableQuantity}
                />
              </label>
            </div>
          </div>
          {/* Supplier */}
          <div className="md:flex">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Supplier</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="supplier"
                  defaultValue={supplier}
                  placeholder="Enter coffee supplier"
                  className="w-full input input-bordered"
                />
              </label>
            </div>
            <div className="w-full ml-4 form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Taste</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="taste"
                  defaultValue={taste}
                  placeholder="Taste"
                  className="w-full input input-bordered"
                />
              </label>
            </div>
          </div>
          {/* Category */}
          <div className="md:flex">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="category"
                  defaultValue={category}
                  placeholder="Category"
                  className="w-full input input-bordered"
                />
              </label>
            </div>
            <div className="w-full ml-4 form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Details</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="details"
                  defaultValue={details}
                  placeholder="Details"
                  className="w-full input input-bordered"
                />
              </label>
            </div>
          </div>
          <div className="w-full my-4 form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="photo"
                defaultValue={photo}
                placeholder="Photo"
                className="w-full input input-bordered"
              />
            </label>
          </div>
          <input
            type="submit"
            className="text-gray-300 btn btn-block bg-slate-600 hover:text-gray-300 hover:bg-slate-600"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}

export default UpdateCoffe;
