"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "./Form";
import { fetchAddress } from "@/lib/getData";
import { useCart } from "@/app/context/useCart";
import {
  StyledOrder,
  OrderGoBack,
  OrderFormWrapper,
} from "@/styles/order/StyledOrder";

const CreateOrder = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    state: { cart },
    dispatch,
  } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const userData = session?.user;
  const [address, setAddress] = useState("");
  const [order, setOrder] = useState<OrderData>({
    userId: "",
    fullName: "",
    phoneNumber: "",
    idNumber: "",
    address: "",
    items: [],
    totalPrice: 0,
  });
  const fetchAndSetAddress = () => {
    fetchAddress().then((data) => {
      if (data) {
        setAddress(data.address);
      } else {
        setError("Unexpected error occurred");
      }
    });
  };

  const createOrder = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log("cart", cart);
      console.log(userData?.id);
      const res = await fetch("http://localhost:3000/api/order/new", {
        method: "POST",
        body: JSON.stringify({
          userId: userData?.id,
          fullName: order.fullName,
          phoneNumber: order.phoneNumber,
          idNumber: order.idNumber,
          address: address,
          items: cart,
          totalPrice: totalPrice,
        }),
      });

      if (!res.ok)
        throw Error(
          `Request failed with status ${res.status}: ${res.statusText}`
        );
      dispatch({ type: "clearCart" });
      setSubmitting(false);
      const { _id: orderId } = await res.json();
      router.push(`/menu/order/${orderId}`);
      console.log("orderId", orderId);
      return { id: orderId };
    } catch {
      throw Error("Failed creating your order");
    }
  };

  return (
    <StyledOrder>
      <OrderGoBack onClick={() => router.back()}> Go Back</OrderGoBack>
      <OrderFormWrapper>
        <h2>
          {userData?.name ? `${userData.name},` : ""} Enter your current details
          to ensure a smooth delivery process
        </h2>
        <Form
          order={order}
          setOrder={setOrder}
          submitting={submitting}
          handleSubmit={createOrder}
          fetchAndSetAddress={fetchAndSetAddress}
          address={address}
          setAddress={setAddress}
        />
      </OrderFormWrapper>
    </StyledOrder>
  );
};

export default CreateOrder;
