export const authConfig = {
  pages: {
    signIn: "/investor/login",
    signOut: "/",
    error: "/investor/login",
  },
  callbacks: {
    authorized({ auth, request }: any) {
      const isAuthRoute = request.nextUrl.pathname.startsWith("/investor");
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
      const isAuthenticated = !!auth?.user;

      if (isAuthRoute && !isAuthenticated) {
        return false;
      }

      return true;
    },
  },
};
