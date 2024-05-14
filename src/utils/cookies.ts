export const getAuthCookie = () => {
  return (
    document.cookie.split(";").find((cookie) => cookie.includes("auth")) || ""
  );
};
