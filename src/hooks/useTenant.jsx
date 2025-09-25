export function useTenant() {
  const host = window.location.hostname;
  console.log(host)
  const parts = host.split(".");
  const tenantId = parts[0];
  return tenantId;
}