export const fetchUser = async (userId, token) => {
  const res = await fetch(`/api/pos/fetch-user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};
