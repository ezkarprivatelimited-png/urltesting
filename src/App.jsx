import { useEffect, useState } from "react";
import { useTenant } from "./hooks/useTenant";

function App() {
  const tenantHost = useTenant();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState("");
  console.log(tenantHost)
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/company/company-info", {
      headers: { Host: tenantHost },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error || data.message) {
          setError(data.message || data.error);
        } else {
          setCompany(data);
        }
      })
      .catch(() => setError("Something went wrong"));
  }, [tenantHost]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <p className="text-red-600 font-bold">{error}</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading company info...</p>
      </div>
    );
  }

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
