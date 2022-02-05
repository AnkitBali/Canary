const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 * Token middleware
 */

class TokenMiddleware {
    static getInstance(payload) {
        if (!TokenMiddleware.instance) {
            TokenMiddleware.instance = new TokenMiddleware(payload);
        }
        return TokenMiddleware.instance;
    }

    // Sign the jwt token with payload
    sign(payload) {
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
            algorithm: config.jwt.algorithm,
            issuer: config.jwt.issuer,
        });
    }

    // Verify the jwt token with payload
    verify(token) {
        try {
            const decoded = jwt.verify(token, config.jwt.secret, {
                expiresIn: config.jwt.expiresIn,
                algorithm: config.jwt.algorithm,
                issuer: config.jwt.issuer,
            });

            return decoded;
        } catch (e) {
            return false;
        }

    }
}

module.exports = TokenMiddleware.getInstance();