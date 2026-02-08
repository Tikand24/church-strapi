
const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

export const formateador = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
});

export const getUrlImage = (url: string) => {
  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}