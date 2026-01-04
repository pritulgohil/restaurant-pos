export const updateRestaurantAPI = async ({ restaurantId, token, payload }) => {
  const res = await fetch(`/api/pos/update-restaurant/${restaurantId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update restaurant");
  }

  return data;
};

export const fetchRestaurantAPI = async ({ loginId, token }) => {
  const res = await fetch(`/api/pos/fetch-restaurant/${loginId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch restaurant");
  }

  return data;
};
