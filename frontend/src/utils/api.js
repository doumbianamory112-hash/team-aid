export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL?.trim();
  const localHostRegex = /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?\/?$/i;

  if (envUrl) {
    if (typeof window !== 'undefined' && import.meta.env.DEV && localHostRegex.test(envUrl)) {
      const { protocol, hostname } = window.location;
      const port = import.meta.env.VITE_API_PORT || envUrl.replace(localHostRegex, '$2').replace(':', '') || '5000';
      return `${protocol}//${hostname}:${port}`;
    }

    return envUrl.replace(/\/$/, '');
  }

  if (typeof window === 'undefined') {
    return 'http://localhost:5000';
  }

  if (import.meta.env.DEV) {
    const { protocol, hostname } = window.location;
    const port = import.meta.env.VITE_API_PORT || '5000';
    return `${protocol}//${hostname}:${port}`;
  }

  return window.location.origin;
}

export function apiUrl(path) {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
