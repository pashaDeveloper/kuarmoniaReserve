// pages/_app.js
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";
import UserPersist from "@/components/shared/persistent/UserPersist";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from '@/components/shared/theme/ThemeContext'; // Adjust this path if necessary
import useUserTracking from '@/hooks/useUserTracking';

export default function App({ Component, pageProps }) {
  // Call the user tracking hook
  useUserTracking(); 

  return (
    <Provider store={store}>
      <UserPersist>
        <ThemeProvider>
          <Component {...pageProps} />
          <Toaster />
        </ThemeProvider>
      </UserPersist>
    </Provider>
  );
}
