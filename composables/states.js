export const useAuth = () =>
  useState(() => ({
    isAuthenticated: false,
    token: useCookie('access_token')
  }));