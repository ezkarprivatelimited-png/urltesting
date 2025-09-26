export function useTenant() {
  const host = window.location.hostname;
  const tenantId = host;
  return tenantId;
}