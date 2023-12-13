// const API_URL = "https://starbucksapi.pythonanywhere.com";
// const BASE_URL = "http://localhost:3000";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCoffees() {
  const res = await fetch(`${BASE_URL}/api/coffee`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw Error("failed to fetch data");
  return res.json();
}

export async function getHomepageData() {
  const res = await fetch(`${BASE_URL}/api/homepage`);
  if (!res.ok) throw Error("Failed to fetch data");
  return res.json();
}

export async function getFooterData() {
  const res = await fetch(`${BASE_URL}/api/footer`);
  if (!res.ok) throw Error("failed to fetch data");
  return res.json();
}

export async function getRewardsData() {
  const res = await fetch(`${BASE_URL}/api/rewards`);
  if (!res.ok) throw Error("failed to fetch data");
  return res.json();
}

export async function fetchCities() {
  const res = await fetch(`${BASE_URL}/api/cities`);
  if (!res.ok) throw Error("failed to fetch data");
  return res.json();
}

export async function fetchCity(id: string) {
  const res = await fetch(`${BASE_URL}/cities/${id}`);
  if (!res.ok) throw Error("Failed getting city");

  const data = await res.json();
  return data;
}

export async function getAddressFromApi({ latitude, longitude }: Position) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

export async function fetchAddress() {
  const position = await new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );

  const { latitude, longitude } = position.coords;
  const data = await getAddressFromApi({ latitude, longitude });

  const address = `${data.locality}, ${data.city} ${data.postcode}, ${data.countryName}`;

  return { position: { latitude, longitude }, address };
}

export async function getOrders() {
  const res = await fetch(`${BASE_URL}/api/order`);
  if (!res.ok) throw Error("failed to fetch data");
  const json = await res.json();
  return json.data;
}

export async function getOrder(id: string) {
  const res = await fetch(`${BASE_URL}/api/order/${id}`);
  if (!res.ok) return undefined;
  const json = await res.json();
  return json;
}

export async function createOrder(newOrder: OrderData) {
  try {
    const res = await fetch(`/api/order/new`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok)
      throw Error(
        `Request failed with status ${res.status}: ${res.statusText}`
      );

    const { orderId } = await res.json();
    return { id: orderId };
  } catch {
    throw Error("Failed creating your order");
  }
}
