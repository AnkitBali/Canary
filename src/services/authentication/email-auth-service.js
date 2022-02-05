const JwtMiddleware = require('../../middlewares/token');

const bcrypt = require('bcrypt');

// Models
const EmailSchema = require('../../schemas/authentication/email-auth-schema.js');

class EmailAuthService {
    // Singleton
    static getInstance() {
        if (!EmailAuthService.instance) {
            EmailAuthService.instance = new EmailAuthService();
        }
        return EmailAuthService.instance;
    }

    constructor() { }

    async signUpWithEmail(email, password, cb) {
        try {
            // Check if email is already registered.
            const user = await EmailSchema.findOne({ email });

            if (user) {
                throw Error('Email is already registered.');
            }

            let _email = new EmailSchema();

            _email.email = email;

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            _email.password = hashed;

            await _email.save();

            return cb(null, _email);
        } catch (e) {
            return cb(e.message);
        }
    }
}

module.exports = EmailAuthService.getInstance();