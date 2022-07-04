import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();

  const noAuthRequired = ["/login", "/register"];

  return (
    <AuthContextProvider>
      <Layout setSidebar={setSidebar} sidebar={sidebar}>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} sidebar={sidebar} setSidebar={setSidebar} />
        ) : (
          <ProtectedRoute>
            <Component
              {...pageProps}
              sidebar={sidebar}
              setSidebar={setSidebar}
            />
          </ProtectedRoute>
        )}
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
