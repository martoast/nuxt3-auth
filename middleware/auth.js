export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();

  if (useCookie('access_token').value) {
    auth.value.isAuthenticated = true;
  }
  
  return auth.value.isAuthenticated ? auth.value.isAuthenticated : navigateTo('/login')
});