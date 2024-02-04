import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Component/UiComponent/AuthContext";
import { ProductProvider } from "./Component/UiComponent/ProductContext";
import RouteFile from "./Routes/RouteFile";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <RouteFile />
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
