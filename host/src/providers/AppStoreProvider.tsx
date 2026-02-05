import { Provider } from "react-redux";
import { store } from "../app/store";

export default function AppStoreProvider({ children }: { readonly children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
