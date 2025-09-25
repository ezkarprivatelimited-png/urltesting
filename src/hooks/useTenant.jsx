export function useTenant() {
  const host = window.location.hostname;
  const parts = host.split(".");
  const tenantId = parts[0];
  return tenantId;
}