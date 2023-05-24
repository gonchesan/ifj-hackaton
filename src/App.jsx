import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import Analyze from "./pages/Analyze";
import Offers from "./pages/Offers";
import { OffersProvider } from "./context/OffersContext";

function App() {
  return (
    <BrowserRouter>
      <OffersProvider>
        <Routes>
          <Route path="" element={<BaseLayout />}>
            <Route path="" element={<Navigate to="/offers" replace />} />
            <Route path="/offers" element={<Offers />}></Route>
            <Route path="/analyze" element={<Analyze />}></Route>
          </Route>
        </Routes>
      </OffersProvider>
    </BrowserRouter>
  );
}

export default App;
