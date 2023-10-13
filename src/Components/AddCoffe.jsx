import { useState } from "react";
import swal from "sweetalert";

function AddCoffee() {
  const [coffeDataFromDB, setCoffeDataFromDB] = useState([]);
  const handleSubmit = (e) => {
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

    // You can now do something with these values, for example, send them to an API.
    // Here, we'll just log the values to the console:
    const coffeData = {
      coffeeName,
      availableQuantity,
      supplier,
      taste,
      category,
      details,
      photo,
    };
    fetch("http://localhost:5000/coffee", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(coffeData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          swal("Good job!", "You clicked the button!", "success", {
            button: "Aww yiss!",
          });
        }
      });
  };
  console.log(coffeDataFromDB);

  return (
    <div className="min-h-screen bg-[#F4F3F0] p-24">
      <h2 className="text-3xl font-black">ADD Coffee</h2>
      <form onSubmit={handleSubmit}>
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
              />
            </label>
          </div>
          <div className="w-full form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Available Quantity</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="availableQuantity"
                placeholder="Available Quantity"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        {/* Supply */}
        <div className="md:flex">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Supplier</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="supplier"
                placeholder="Enter coffee supplier"
                className="w-full input input-bordered"
              />
            </label>
          </div>
          <div className="w-full form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Taste</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="taste"
                placeholder="Taste"
                className="input input-bordered w-full"
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
                placeholder="Category"
                className="w-full input input-bordered"
              />
            </label>
          </div>
          <div className="w-full form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Details</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="details"
                placeholder="Details"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="photo"
              placeholder="Photo"
              className="w-full input input-bordered"
            />
          </label>
        </div>
        <input
          type="submit"
          className="btn btn-block bg-slate-600 text-gray-300 hover:text-gray-300 hover:bg-slate-600"
          value="Submit"
        />
      </form>
    </div>
  );
}

export default AddCoffee;
