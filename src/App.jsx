import { useEffect, useState } from "react";
import { useTenant } from "./hooks/useTenant";
import axios from "axios";

// ✅ Utility: cache with expiry
function setWithExpiry(key, value, ttl) {
  const now = Date.now();
  const item = { value, expiry: now + ttl };
  sessionStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) return null;
  try {
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    return null;
  }
}

function App() {
  const tenantHost = useTenant();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tenantHost) return;

    // ✅ Check sessionStorage cache first
    const cached = getWithExpiry(`tenantInfo-${tenantHost}`);
    if (cached) {
      setCompany(cached);
      return;
    }

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
        // ✅ Cache for 24h
          setWithExpiry(`tenantInfo-${tenantHost}`, data, 24 * 60 * 60 * 1000);
        }
      } catch (e) {
        console.error("API call failed:", e);
        setError("Unable to fetch company info");
      }
    };

    sendData();
  }, [tenantHost]); // ✅ Depend on tenantHost

  if (error) return <p className="text-red-600">{error}</p>;
  if (!company) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 text-center">
        {company.logoUrl && (
          <img
            src={company.logoUrl}
            alt={company.name}
            className="h-20 mx-auto mb-4"
          />
        )}
        <h1 className="text-2xl font-bold mb-2">{company.name}</h1>
        <p className="text-gray-600">Welcome to {company.subdomain}</p>
      </div>
    </div>
  );
}

export default App;
