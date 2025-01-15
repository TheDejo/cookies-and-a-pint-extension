export const decodetoken = (token: string): { firstName: string; user_id: string } => {
    try {
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }

        const payload = JSON.parse(
            decodeURIComponent(
                atob(parts[1])
                    .split('')
                    .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
                    .join('')
            )
        );

        const { firstName, user_id, exp } = payload;

        if (!firstName || !user_id || !exp) {
            throw new Error('Missing required fields in token payload');
        }

        const isExpired = Date.now() >= exp * 1000;
        if (isExpired) {
            throw new Error('Token has expired');
        }

        return { firstName, user_id };
    } catch (error: any) {
        console.error('Error decoding JWT:', error.message);
        throw new Error(error.message || 'Invalid token');
    }
};
