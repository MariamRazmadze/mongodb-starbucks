interface CoffeeItem {
  id: number;
  name: string;
  photoName: string;
  type: string;
  unavailable: boolean;
  calories: string;
  fat: string;
  sugar: string;
  description: string;

  detailedPhotoName: string;
  stars: string;
  prices: {
    [size: string]: number;
    short: number;
    tall: number;
    grande: number;
    venti: number;
  };
}

type CoffeeCategory = {
  [category: string]: {
    items: CoffeeItem[];
  };
};
type CoffeeData = Array<{
  _id: string;
  id: number;
  name: string;
  photoName: string;
  link: string;
  items: CoffeeItem[];
}>;

type Coffees = {
  items: CoffeeItem[];
  photoName: string;
  link: string;
  name: string;
};

interface GroupedCoffees {
  [key: string]: CoffeeItem[];
}

type MenuProps = {
  coffees: {
    name: string;
    photoName: string;
    link: string;
    items: CoffeeItem[];
  }[];
};

type CoffeeType = {
  [key: string]: any;
  name: string;
  photoName: string;
  link: string;
  items: CoffeeItem[];
};
interface BoxItem {
  id: string;
  title: string;
  promo: string;
  photoName: string;
  buttonText: string;
  backgroundColor: string;
  buttonColor: string;
  buttonHoverColor: string;
}
interface BoxItemProps {
  item: BoxItem;
  isReversed?: boolean;
}

interface Link {
  id: string;
  text: string;
  link: string;
}

interface AccordionData {
  id: string;
  title: string;
  content: Link[];
}

interface AccordionProps {
  data: AccordionData[];
}

interface ContentItem {
  id: string;
  number: number;
  photoName: string;
  title: string;
  promo: string;
}

interface RewardStepsProps {
  content: ContentItem[];
}

interface TabProps {
  num: number;
  activeTab: number;
  onClick: (num: number) => void;
  item: ContentItem;
}

interface TabContentProps {
  item: ContentItem;
}

type SizeSelectorProps = {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
};

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
interface QuizAction {
  type: string;
  questionsPayload?: Question[];
  answerPayload?: number;
}

interface QuestionProps {
  question: Question;
  dispatch: React.Dispatch<QuizAction>;
  answer?: number | null;
  index: number;
  numQuestions: number | undefined;
  points: number | null | undefined;
  maxPossiblePoints: number | undefined;
}

interface Position {
  latitude: number;
  longitude: number;
}

interface CityData {
  cityName: string;
  address: string;
  country: string;
  position: {
    lat: number;
    lng: number;
  };
  _id: string;
  storeHours: {
    open: string;
    close: string;
  };
}

interface CartItemType {
  coffeeId: number;
  name: string;
  image: string;
  stars: string;
  quantity: number;
  size: string;
  unitPrice: number;
  totalPrice: number;
}

type CartAction =
  | { type: "addItem"; payload: CartItemType }
  | { type: "deleteItem"; payload: number }
  | { type: "increaseQuantity"; payload: number }
  | { type: "decreaseQuantity"; payload: number }
  | { type: "clearCart" };

interface CartState {
  cart: CartItemType[];
}

interface OrderItem {
  id: number;
  coffeeId: number;
  orderId: number;
  name: string;
  quantity: number;
  size: string;
  unitPrice: number;
  totalPrice: number;
}

interface OrderData {
  userId: string;
  fullName: string;
  phoneNumber: string;
  idNumber: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
}
