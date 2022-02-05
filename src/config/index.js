// Configuration file
const config = {
    // The port to run the server on
    port: 3000,
    // The environment to run the server in
    environment: 'development',
    // The path to the public folder
    publicPath: './public',
    // The path to the views folder
    viewsPath: './views',
    // The path to the views engine
    viewsEngine: 'pug',
    // Database config
    database: {
        type: 'mongodb',
        url: 'mongodb://localhost:27017/canary',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },

    // JWT config
    jwt: {
        secret: '71741f8383785bdb68bac32defa8b27aa2f28eac7b819ffcbc60b3f943ec0ae9',
        expiresIn: '1d',
        algorithm: 'HS256',
        issuer: 'canary'
    },
    roles: {
        admin: 'admin',
        user: 'user'
    }
}

module.exports = config;