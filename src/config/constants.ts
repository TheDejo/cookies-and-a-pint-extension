const ENVIRONMENT = {
    development: process.env.NEXT_PUBLIC_ENVIRONMENT === 'development',
    production: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
};

const BASE_URL = import.meta.env.VITE_BASE_URL

const API_ROUTES = {
    extractSkills: `${BASE_URL}/api/extract-skills`
}

export const constants = {
    ENVIRONMENT,
    API_ROUTES,
}