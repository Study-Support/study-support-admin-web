export default defineNuxtRouteMiddleware(() => {
  const { token } = useToken();

  if (token.value === undefined) {
    // console.log("ok11")
    return navigateTo({ name: 'login' });
  }
  return true;
});
