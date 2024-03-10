"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Account() {
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
  const router = useRouter();

  async function extractAllAddresses() {
    setPageLevelLoader(true);
    const res = await fetchAllAddresses(user?._id);

    if (res.success) {
      setPageLevelLoader(false);

      setAddresses(res.data);
    }
  }

  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditedAddressId !== null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({ ...addressFormData, userID: user?._id });

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: "top-right", // Specify the position as 'top-right'
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAddresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  async function handleDelete(getCurrentAddressID) {
    setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

    const res = await deleteAddress(getCurrentAddressID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.success(res.message, {
        position: "top-right", // Specify the position as 'top-right'
      });
      extractAllAddresses();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.error(res.message, {
        position: "top-right", // Specify the position as 'top-right'
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllAddresses();
  }, [user]);

  return (
    <section className="overflow-x-hidden mb-16">
      {" "}
      {/* Added  for bottom margin */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md">
          <div className="p-6 sm:p-12 flex flex-col sm:flex-row">
            {/* Render random user image here */}
            <div className="flex flex-col sm:mr-6 sm:mb-0 mb-6">
              {/* User image */}
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="text-lg font-semibold text-center sm:text-left">
                {user?.name}
              </h4>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
              <button
                onClick={() => router.push("/orders")}
                className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
                View Your Orders
              </button>
            </div>
          </div>
          <div className="px-6 sm:px-12">
            <h1 className="font-bold text-lg">Your Addresses :</h1>
            {pageLevelLoader ? (
              <PulseLoader
                color={"#000000"}
                loading={pageLevelLoader}
                size={15}
                data-testid="loader"
              />
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {addresses && addresses.length ? (
                  addresses.map((item) => (
                    <div className="border p-6" key={item._id}>
                      <p>Name : {item.fullName}</p>
                      <p>Address : {item.address}</p>
                      <p>City : {item.city}</p>
                      <p>Country : {item.country}</p>
                      <p>PostalCode : {item.postalCode}</p>
                      <div className="flex gap-5">
                        <button
                          onClick={() => handleUpdateAddress(item)}
                          className="inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                        >
                          {componentLevelLoader &&
                          componentLevelLoader.loading &&
                          componentLevelLoader.id === item._id ? (
                            <ComponentLevelLoader
                              text={"Deleting"}
                              color={"#ffffff"}
                              loading={
                                componentLevelLoader &&
                                componentLevelLoader.loading
                              }
                            />
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No address found! Please add a new address below</p>
                )}
              </div>
            )}
          </div>
          <div className="px-6 sm:px-12 mt-4">
            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
            >
              {showAddressForm ? "Hide Address Form" : "Add New Address"}
            </button>
          </div>
          {showAddressForm && (
            <div className="px-6 sm:px-12 mt-5 flex flex-col items-center">
              <div className="w-full space-y-8">
                {addNewAddressFormControls.map((controlItem) => (
                  <InputComponent
                    key={controlItem.id}
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    label={controlItem.label}
                    value={addressFormData[controlItem.id]}
                    onChange={(event) =>
                      setAddressFormData({
                        ...addressFormData,
                        [controlItem.id]: event.target.value,
                      })
                    }
                  />
                ))}
              </div>
              <button
                onClick={handleAddOrUpdateAddress}
                className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={"Saving"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <Notification />
    </section>
  );
}
