import { AuthenticatedProvider } from "@/data/context/AuthenticatedContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const routesWithoutProviderAuthentication = ["/login"];
  const shoudUseProviderAuthentication =
    !routesWithoutProviderAuthentication.includes(router.pathname);

  return shoudUseProviderAuthentication ? (
    <AuthenticatedProvider>
      <Component {...pageProps} />
    </AuthenticatedProvider>
  ) : (
    <Component {...pageProps} />
  );
}
