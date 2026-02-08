import qs from 'qs';

// Configuración de Strapi
const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN || '';

interface StrapiRequestOptions {
  endpoint: string;
  query?: object;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Función principal para hacer peticiones a la API de Strapi
 * @param endpoint - El endpoint de la API (ej: 'schedules', 'priests')
 * @param query - Objeto con los parámetros de query (populate, filters, etc.)
 * @param wrappedByKey - Clave para extraer los datos de la respuesta
 * @param wrappedByList - Si los datos vienen en formato de lista
 */
export async function fetchAPI<T>(
  endpoint: string,
  query?: object,
  wrappedByKey?: string,
  wrappedByList?: boolean
): Promise<T> {
  // Construir la query string usando qs
  const queryString = query
    ? qs.stringify(query, {
        encodeValuesOnly: true, // Codifica solo los valores
        arrayFormat: 'brackets', // Formato: filters[field][$eq]=value
      })
    : '';

  // Construir la URL completa
  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

  // Headers de la petición
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Agregar token de autenticación si existe
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extraer datos según la estructura de respuesta de Strapi
    if (wrappedByKey) {
      return wrappedByList ? data[wrappedByKey] : data[wrappedByKey];
    }

    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Helper para construir queries de populate complejas
 * @param fields - Array de campos a popular
 */
export function buildPopulateQuery(fields: string[] | object) {
  if (Array.isArray(fields)) {
    return {
      populate: fields.join(','),
    };
  }
  return {
    populate: fields,
  };
}

/**
 * Ejemplos de queries comunes usando qs
 */

// Ejemplo 1: Popular todos los campos de primer nivel
export const populateAll = {
  populate: '*',
};

// Ejemplo 2: Popular campos específicos
export const populateSpecific = (fields: string[]) => ({
  populate: fields,
});

// Ejemplo 3: Popular relaciones anidadas
export const populateDeep = (depth: number = 5) => ({
  populate: {
    populate: '*',
  },
});

// Ejemplo 4: Popular con filtros
export const populateWithFilters = {
  populate: {
    categories: {
      filters: {
        name: {
          $eq: 'ejemplo',
        },
      },
    },
  },
};

/**
 * Función helper para obtener datos con populate
 */
export async function fetchWithPopulate<T>(
  endpoint: string,
  populateFields: string | string[] | object = '*'
): Promise<T> {
  const query = typeof populateFields === 'string'
    ? { populate: populateFields }
    : Array.isArray(populateFields)
    ? { populate: populateFields.join(',') }
    : { populate: populateFields };

  return fetchAPI<T>(endpoint, query, 'data', true);
}

/**
 * Función helper para obtener un solo elemento por ID
 */
export async function fetchSingleEntry<T>(
  endpoint: string,
  id: string | number,
  populateFields?: string[] | object
): Promise<T> {
  const query = populateFields
    ? typeof populateFields === 'string'
      ? { populate: populateFields }
      : Array.isArray(populateFields)
      ? { populate: populateFields.join(',') }
      : { populate: populateFields }
    : { populate: '*' };

  return fetchAPI<T>(`${endpoint}/${id}`, query, 'data', false);
}

/**
 * Función helper para obtener múltiples entradas con filtros
 */
export async function fetchEntriesWithFilters<T>(
  endpoint: string,
  filters: object,
  populateFields?: string[] | object
): Promise<T> {
  const query = {
    filters,
    ...(populateFields && {
      populate: typeof populateFields === 'string'
        ? populateFields
        : Array.isArray(populateFields)
        ? populateFields.join(',')
        : populateFields,
    }),
  };

  return fetchAPI<T>(endpoint, query, 'data', true);
}

// Exportar la URL base por si se necesita
export { STRAPI_URL };
