const API_BASE_URL = "http://localhost:1911/api/auth"; // Vendos URL e backend-it

export const registerUser = async (data: {
    fullName: string;
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // To save cookies from the backend
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }
  
      return res.json();
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };
  
export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // For httpOnly cookie
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
};
export const logoutUser = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  