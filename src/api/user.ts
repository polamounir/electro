import Cookies from "js-cookie";

export function parseJwt() {
  const token = Cookies.get("accessToken");
  if (!token) {
    console.warn("No token found in cookies.");
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    console.error("Invalid JWT structure.");
    return null;
  }

  const base64Url = parts[1]; 
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  try {
    const jsonPayload = JSON.parse(atob(base64));
    console.log(jsonPayload);
    return jsonPayload;

  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}
