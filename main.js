
const portUsed = require('port-used');

const express = require('express');

const { PORT, NODE_ENV } = process.env;
const port = Number(PORT) || 3000;

async function main() {
    if (NODE_ENV !== 'production') {
        await checkPortAvailability();
    }

    await startServer();
}

async function checkPortAvailability() {
    // Check that the development server is not already running
    const portInUse = await portUsed.check(port);

    if (portInUse) {
        console.log(`\nPort ${port} is not available. You may already have a server running.`);
        console.log(
            `Try running \`npx kill-port ${port}\` to shut down all your running node processes.\n`
        );
        console.log('\x07'); // system 'beep' sound
        process.exit(1);
    }
}

async function startServer() {
    const app = express();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();
