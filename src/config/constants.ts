const ENVIRONMENT = {
    development: import.meta.env.VITE_PUBLIC_ENVIRONMENT === 'development',
    production: import.meta.env.VITE_PUBLIC_ENVIRONMENT === 'production',
};

const BASE_URL = import.meta.env.VITE_BASE_URL

const API_ROUTES = {
    extractSkills: `${BASE_URL}/api/extension/extract-skills`,
    autofill: `${BASE_URL}/api/extension/autofill`
}

export const constants = {
    ENVIRONMENT,
    API_ROUTES,
}