import objectCleaner from "@/utils/objectCleaner";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const login = async (values) => {
  const res = await fetch(`${BASE_API_URL}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objectCleaner(values)),
  });

  return res.json();
};

export { login };
