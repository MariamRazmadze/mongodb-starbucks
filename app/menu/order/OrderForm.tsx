import { FormEvent } from "react";
import {
  InputsContainer,
  InputWrapper,
  InputLabel,
  OrderInput,
  FetchAddressWrapper,
  FetchAddressButton,
  OrderButton,
} from "@/styles/order/StyledOrder";

interface OrderFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  address: string;
  setAddress: (value: string) => void;
  fetchAndSetAddress: () => void;
  error: string;
  isSubmitting: boolean;
  cart: CartItemType[];
  totalPrice: number;
}

const OrderForm = ({
  handleSubmit,
  address,
  setAddress,
  fetchAndSetAddress,
  error,
  isSubmitting,
  cart,
  totalPrice,
}: OrderFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputsContainer>
        <InputWrapper>
          <InputLabel>Full Name:</InputLabel>
          <OrderInput type="text" name="full_name" required />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>Phone number:</InputLabel>
          <OrderInput type="tel" name="phone_number" required />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>Id Number: </InputLabel>
          <OrderInput type="text" name="id_number" required />
        </InputWrapper>
        <FetchAddressWrapper>
          <InputWrapper>
            <InputLabel>Address: </InputLabel>
            <OrderInput
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <FetchAddressButton
              onClick={(e) => {
                e.preventDefault();
                fetchAndSetAddress();
              }}
            >
              Get location
            </FetchAddressButton>

            {error && <div style={{ color: "red" }}>{error}</div>}
          </InputWrapper>
        </FetchAddressWrapper>
        <div>
          <input type="hidden" name="items" value={JSON.stringify(cart)} />
          <input type="hidden" name="total_price" value={totalPrice} />
          <OrderButton disabled={isSubmitting}>
            {isSubmitting ? "placing order..." : "Order now"}
          </OrderButton>
        </div>
      </InputsContainer>
    </form>
  );
};

export default OrderForm;
