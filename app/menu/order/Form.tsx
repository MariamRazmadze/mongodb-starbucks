import {
  InputsContainer,
  InputWrapper,
  InputLabel,
  OrderInput,
  FetchAddressWrapper,
  FetchAddressButton,
  OrderButton,
} from "@/styles/order/StyledOrder";
import { FormEvent } from "react";

interface FormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  address: string;
  setAddress: (value: string) => void;
  fetchAndSetAddress: () => void;
  submitting: boolean;
  order: OrderData;
  setOrder: (value: ((prevState: OrderData) => OrderData) | OrderData) => void;
}

const Form = ({
  order,
  setOrder,
  submitting,
  handleSubmit,
  fetchAndSetAddress,
  address,
  setAddress,
}: FormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputsContainer>
        <InputWrapper>
          <InputLabel>Full Name:</InputLabel>
          <OrderInput
            type="text"
            name="fullName"
            required
            value={order.fullName}
            onChange={(e) => setOrder({ ...order, fullName: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>Phone number:</InputLabel>
          <OrderInput
            type="tel"
            name="phoneNumber"
            required
            value={order.phoneNumber}
            onChange={(e) =>
              setOrder({ ...order, phoneNumber: e.target.value })
            }
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>Id Number: </InputLabel>
          <OrderInput
            type="text"
            name="idNumber"
            required
            value={order.idNumber}
            onChange={(e) => setOrder({ ...order, idNumber: e.target.value })}
          />
        </InputWrapper>
        <FetchAddressWrapper>
          <InputWrapper>
            <InputLabel>Address: </InputLabel>
            <OrderInput
              type="text"
              name="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setOrder({ ...order, address: e.target.value });
              }}
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
          </InputWrapper>
        </FetchAddressWrapper>
        <div>
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(order.items)}
            onChange={(e) =>
              setOrder({ ...order, items: JSON.parse(e.target.value) })
            }
            required
          />
          <input
            type="hidden"
            name="totalPrice"
            value={order.totalPrice}
            onChange={(e) =>
              setOrder({ ...order, totalPrice: parseFloat(e.target.value) })
            }
          />
          <OrderButton disabled={submitting}>
            {submitting ? "placing order..." : "Order now"}
          </OrderButton>
        </div>
      </InputsContainer>
    </form>
  );
};

export default Form;
