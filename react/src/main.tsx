import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

/* 
To Setup Redux install the following packages:
- npm install @reduxjs/toolkit react-redux
- Create a state folder with slices and store files
- Wrap the <App /> component with <Provider store={store}> in this file
- Use useSelector and useDispatch hooks in your components to interact with the Redux store
- https://redux-toolkit.js.org/tutorials/quick-start
*/

import { store } from "./state/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
