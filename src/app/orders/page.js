'use client'
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getAllOrdersForUser } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Orders() {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllOrders() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForUser(user?._id);

    if (res.success) {
      setPageLevelLoader(false);

      setAllOrdersForUser(res.data);
      toast.success(res.message, {
        position: "top-right", // Specify the position as 'top-right'
      });
    } else {
      setPageLevelLoader(false);
      toast.error(res.message, {
        position: "top-right", // Specify the position as 'top-right'
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user]);

  console.log(allOrdersForUser);

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section className="overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForUser.map((item) => (
                      <li
                        key={item._id}
                        className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                      >
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                          <h1 className="font-bold text-lg mb-3 sm:mb-0">
                            #Order: {item._id}
                          </h1>
                          <p className="text-2xl font-semibold text-gray-900">
                            ${item.totalPrice}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.orderItems.map((orderItem, index) => (
                            <div key={index} className="w-24 h-24">
                              <img
                                alt="Order Item"
                                className="w-full h-full rounded-lg object-cover"
                                src={orderItem.product.imageUrl}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between">
                          <button className="disabled:opacity-50 mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                            {item.isProcessing
                              ? "Order is Processing"
                              : "Order is delivered"}
                          </button>
                          <button
                            onClick={() => router.push(`/orders/${item._id}`)}
                            className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                          >
                            View Order Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-lg">
                    Your order history is empty!
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
