import { useEffect, useState } from "react";
import { useTenant } from "./hooks/useTenant";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";

function App() {
  const tenantHost = useTenant();
  const [error, setError] = useState("");
  const [company, setCompany] = useState(null);
  useEffect(() => {
    const sendData = async () => {
      try {
        const { data } = await axios.get(
          `http:localhost:3000/api/v1/company/company-info`,
          { headers: { "tenant-host": tenantHost } }
        );

        if (data.error) {
          setError(data.error);
        } else if (data.message && !data.companyId) {
          setError(data.message);
        } else {
          setCompany(data);
          sessionStorage.setItem("tenant-host",JSON.stringify(data));
        }
      } catch (e) {
        console.error("API call failed:", e);
        setError("Unable to fetch company info");
      }
    };

    sendData();
  }, [tenantHost]); // ✅ Depend on tenantHost

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <Dashboard
              error={error}
              company={company}
              setCompany={setCompany}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
