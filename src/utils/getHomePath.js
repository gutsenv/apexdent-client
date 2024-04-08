function getHomePath(role) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return "/";
  return role === "user" ? "/dashboard" : "/dentist-dashboard";
}

export default getHomePath;