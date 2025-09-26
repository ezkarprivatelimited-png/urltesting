export function useTenant() {
  const host = window.location.hostname;
  const tenantId = host.split(".")[1];
  return tenantId;
}