"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/app/context/useCart";
import { useState, useEffect } from "react";
import { createOrder, fetchAddress } from "@/lib/getData";
import OrderForm from "./OrderForm";
import {
  StyledOrder,
  OrderGoBack,
  OrderFormWrapper,
} from "@/styles/order/StyledOrder";

import EmptyOrder from "./EmptyOrder";
export default function CreateOrder() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    state: { cart },
    dispatch,
  } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);
  const userData = session?.user;
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const fetchAndSetAddress = () => {
    fetchAddress().then((data) => {
      if (data) {
        setAddress(data.address);
      } else {
        setError("Unexpected error occurred");
      }
    });
  };

  const handleOrder = async (data: OrderData) => {
    setIsSubmitting(true);
    const order = {
      ...data,
      cart: JSON.parse(data.items),
    };
    const errors = {};

    if (Object.keys(errors).length > 0) return errors;
    const newOrder = await createOrder(order);
    dispatch({ type: "clearCart" });
    setIsSubmitting(false);
    setOrderPlaced(true);
    return router.push(`/menu/order/${newOrder.id}`);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const data: OrderData = {
      userId: session?.user.id,
      full_name: formData.full_name as string,
      phone_number: formData.phone_number as string,
      id_number: formData.id_number as string,
      address: formData.address as string,
      items: formData.items as string,
      total_price: Number(formData.total_price),
    };

    handleOrder(data);
  };

  useEffect(() => {
    return () => {
      setOrderPlaced(false);
    };
  }, []);

  if (!cart.length && !orderPlaced) return <EmptyOrder />;
  return (
    <StyledOrder>
      <OrderGoBack onClick={() => router.back()}> Go Back</OrderGoBack>
      <OrderFormWrapper>
        <h2>
          {userData?.name ? `${userData.name},` : ""} Enter your current details
          to ensure a smooth delivery process
        </h2>
        <OrderForm
          handleSubmit={handleSubmit}
          address={address}
          setAddress={setAddress}
          fetchAndSetAddress={fetchAndSetAddress}
          error={error}
          isSubmitting={isSubmitting}
          cart={cart}
          totalPrice={totalPrice}
        />
      </OrderFormWrapper>
    </StyledOrder>
  );
}
