const JwtMiddleware = require('../../middlewares/token');
const config = require('../../config');

const bcrypt = require('bcrypt');

// Models
const EmailSchema = require('../../schemas/authentication/email-auth-schema.js');
const UserSchema = require('../../schemas/users/user-schema.js');

class EmailAuthService {
    // Singleton
    static getInstance() {
        if (!EmailAuthService.instance) {
            EmailAuthService.instance = new EmailAuthService();
        }
        return EmailAuthService.instance;
    }

    constructor() { }

    // Register a new user with email and password.
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

    // Check email and password and receive token to make further requests.
    async loginWithEmail(email, password, cb) {
        try {
            // Check if email is already registered.
            const user = await EmailSchema.findOne({ email });

            if (user) {
                // Check if password is correct.
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    throw Error('Invalid credentials');
                }

                const payload = {
                    uid: user._id,
                    role: config.roles.user, // role assigned to user

                }

                // Generate JWT token
                const token = JwtMiddleware.sign(payload);

                return cb(null, {
                    token,
                    is_completed_signup: user.user === null ? false : true,
                });
            }
            else {
                return cb('Email is not registered.');
            }

        } catch (e) {
            return cb(e.message);
        }
    }

    // Complete the basic profile setup after first successful login.
    async completeProfile(req, cb) {
        try {
            // Get the information filled by user.
            const { first_name, last_name, bio, location, profession } = req.body;

            if (!first_name || !bio || !location || !profession) {
                throw Error('Please fill all the fields.');
            }

            // Get the user from the database.
            const emailRecord = await EmailSchema.findOne({ _id: req.uid });

            if (emailRecord.user !== null) {
                throw Error('Profile is already completed');
            }

            // Create the user document.
            const user = new UserSchema();

            user.first_name = first_name;
            user.last_name = last_name || '';
            user.bio = bio;
            user.location = location;
            user.profession = profession;

            await user.save();

            emailRecord.user = user._id;

            await emailRecord.save();

            return cb(null);
        } catch (e) {
            return cb(e.message);
        }
    }
}

module.exports = EmailAuthService.getInstance();