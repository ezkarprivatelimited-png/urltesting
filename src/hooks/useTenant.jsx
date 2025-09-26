export function useTenant() {
  const host = window.location.hostname;
  const tenantId = host.split(".")[0];
  return tenantId;
}