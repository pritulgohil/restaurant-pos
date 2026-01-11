export const updateRestaurantAPI = async ({ restaurantId, payload }) => {
  const res = await fetch(`/api/pos/update-restaurant/${restaurantId}`, {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update restaurant");
  }

  return data;
};

export const fetchRestaurantAPI = async ({ loginId }) => {
  const res = await fetch(`/api/pos/fetch-restaurant/${loginId}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch restaurant");
  }

  return data;
};
