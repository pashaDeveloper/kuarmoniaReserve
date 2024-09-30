// pages/_app.js
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";
import UserPersist from "@/components/shared/persistent/UserPersist";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from '@/components/shared/theme/ThemeContext'; // Adjust this path if necessary
import AppWithTracking from './AppWithTracking'; // مسیر صحیح را تنظیم کنید

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppWithTracking>
        <UserPersist>
          <ThemeProvider>
            <Component {...pageProps} />
            <Toaster />
          </ThemeProvider>
        </UserPersist>
      </AppWithTracking>
    </Provider>
  );
}
