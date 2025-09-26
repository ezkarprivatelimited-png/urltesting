import React, { useEffect } from "react";

const Dashboard = ({ error ,company, setCompany}) => {
 
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
  useEffect(() => {
    if (!tenantHost) return;

    // ✅ Check sessionStorage cache first
    const cached = getWithExpiry(`tenantInfo-${tenantHost}`);
    if (cached) {
      setCompany(cached);
      return;
    }
  }, []);

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
};

export default Dashboard;
