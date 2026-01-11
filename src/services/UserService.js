export const fetchUser = async (userId) => {
  const res = await fetch(`/api/pos/fetch-user/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};
