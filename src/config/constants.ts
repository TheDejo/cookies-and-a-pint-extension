const ENVIRONMENT = {
    development: import.meta.env.VITE_PUBLIC_ENVIRONMENT === 'development',
    production: import.meta.env.VITE_PUBLIC_ENVIRONMENT === 'production',
};

const BASE_URL = ENVIRONMENT.production ?  'https://www.discoversm.com' : 'http://localhost:3000';

const API_ROUTES = {
    extractSkills: `${BASE_URL}/api/extension/extract-skills`,
    autofill: `${BASE_URL}/api/extension/autofill`,
    checkSubscriptionDetails: `${BASE_URL}/api/extension/check-subscription-details`,
    getCookies: BASE_URL
}

export const constants = {
    ENVIRONMENT,
    API_ROUTES,
}