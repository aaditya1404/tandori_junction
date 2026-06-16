"use client";

import { useState, useEffect } from "react";
import {
  saveAddress,
  getAddresses,
  deleteAddress,
  updateAddress,
} from "@/services/addressService";

import {
  getCurrentUser,
} from "@/services/authService";    

export default function AddressesPage() {
    isDefault: true
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] =
  useState(null);

  const [formData, setFormData] = useState({
    label: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
  });

  const [addresses, setAddresses] = useState([]);

const handleDelete = async (
  addressId
) => {
  const user = getCurrentUser();

  if (!user) return;

  const confirmDelete =
    window.confirm(
      "Delete this address?"
    );

  if (!confirmDelete) return;

  const result =
    await deleteAddress(
      user.uid,
      addressId
    );

  if (result.success) {
    await loadAddresses();
  }
};

const handleEdit = (address) => {
  setEditingId(address.id);

  setFormData({
    label: address.label,
    fullName: address.fullName,
    phone: address.phone,
    address: address.address,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    latitude: address.latitude,
    longitude: address.longitude,
  });

  setShowForm(true);
};
const loadAddresses = async () => {
  const user = getCurrentUser();

  if (!user) return;

  const result = await getAddresses(
    user.uid
  );

  if (result.success) {
    setAddresses(result.addresses);
  }
};

useEffect(() => {
  loadAddresses();
}, []);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const data = await response.json();

          setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lon,

            address: data.display_name || "",

            city:
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "",

            state:
              data.address?.state || "",

            pincode:
              data.address?.postcode || "",
          }));
        } catch (error) {
          console.error(error);
          alert("Failed to fetch address.");
        }
      },
      (error) => {
        console.error(error);
        alert("Unable to fetch location.");
      }
    );
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const user = getCurrentUser();

  if (!user) {
    alert("Please login first");
    return;
  }
const alreadyExists = addresses.some(
  (address) =>
    address.id !== editingId &&
    Number(address.latitude).toFixed(5) ===
      Number(formData.latitude).toFixed(5) &&
    Number(address.longitude).toFixed(5) ===
      Number(formData.longitude).toFixed(5)
);

if (alreadyExists) {
  alert("This address is already saved");
  return;
}
  if (editingId) {

  const result =
    await updateAddress(
      user.uid,
      editingId,
      formData
    );

  if (result.success) {
    await loadAddresses();

    setEditingId(null);

    setShowForm(false);
  }

} else {

  const result =
    await saveAddress(
      user.uid,
      formData
    );

  if (result.success) {
    await loadAddresses();

    setShowForm(false);
  }

}

 if (result.success) {
  alert("Address Saved Successfully");

  await loadAddresses();

  setFormData({
    label: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
  });

  setShowForm(false);
} else {
    alert(result.error);
  }
};

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-bold">
            My Addresses
          </h1>

          <p className="text-zinc-400 mt-3">
            Manage your delivery locations
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <button
          onClick={() => setShowForm(true)}
          className="
            bg-orange-500
            hover:bg-orange-600
            px-6
            py-3
            rounded-xl
            font-semibold
            mb-8
            transition
          "
        >
          ➕ Add New Address
        </button>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-6
              mb-10
              space-y-4
            "
          >
            <h2 className="text-2xl font-bold">
              Add Address
            </h2>

            <button
              type="button"
              onClick={getCurrentLocation}
              className="
                bg-blue-500
                hover:bg-blue-600
                px-5
                py-3
                rounded-xl
                font-semibold
              "
            >
              📍 Use Current Location
            </button>

            {formData.address && (
              <div
                className="
                  bg-green-500/20
                  border
                  border-green-500
                  p-4
                  rounded-xl
                "
              >
                ✅ Address Auto-Filled Successfully
              </div>
            )}

            <input
              type="text"
              name="label"
              placeholder="Home / Office"
              value={formData.label}
              onChange={handleChange}
              className="
                w-full
                p-4
                rounded-xl
                bg-zinc-800
              "
              required
            />

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="
                w-full
                p-4
                rounded-xl
                bg-zinc-800
              "
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="
                w-full
                p-4
                rounded-xl
                bg-zinc-800
              "
              required
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              className="
                w-full
                h-32
                p-4
                rounded-xl
                bg-zinc-800
              "
              required
            />

            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="
                  p-4
                  rounded-xl
                  bg-zinc-800
                "
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="
                  p-4
                  rounded-xl
                  bg-zinc-800
                "
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="
                  p-4
                  rounded-xl
                  bg-zinc-800
                "
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="
                  bg-orange-500
                  hover:bg-orange-600
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                "
              >
                Save Address
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="
                  bg-zinc-700
                  hover:bg-zinc-600
                  px-6
                  py-3
                  rounded-xl
                "
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Saved Addresses */}
        <div className="space-y-6">
          {addresses.length === 0 && (
            <div
              className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                p-10
                text-center
              "
            >
              <div className="text-5xl mb-4">
                📍
              </div>

              <h2 className="text-2xl font-bold">
                No Addresses Added
              </h2>

              <p className="text-zinc-400 mt-2">
                Add your first delivery address
              </p>
            </div>
          )}

          {addresses.map((address) => (
            <div
              key={address.id}
              className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                p-6
              "
            >
              <h2 className="text-xl font-bold">
                📍 {address.label}
              </h2>

              <p className="mt-3 font-medium">
                {address.fullName}
              </p>

              <p className="text-zinc-400">
                {address.phone}
              </p>

              <p className="mt-3">
                {address.address}
              </p>

              <p className="text-zinc-400 mt-2">
                {address.city}, {address.state} -{" "}
                {address.pincode}
              </p>
            <div className="mt-4 flex gap-3">

  <button
    onClick={() =>
      handleDelete(address.id)
    }
    className="
    bg-red-500
    hover:bg-red-600
    px-4
    py-2
    rounded-lg
    "
  >
    Delete
  </button>
  <button
  onClick={() =>
    handleEdit(address)
  }
  className="
  bg-blue-500
  hover:bg-blue-600
  px-4
  py-2
  rounded-lg
  "
>
  Edit
</button>

</div>

              {address.latitude && (
                <div className="mt-5 flex gap-3">
                  <a
                    href={`https://www.google.com/maps?q=${address.latitude},${address.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      bg-blue-500
                      hover:bg-blue-600
                      px-4
                      py-2
                      rounded-lg
                      text-white
                    "
                  >
                    📍 View On Map
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}