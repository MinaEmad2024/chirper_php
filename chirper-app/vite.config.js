import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';

// Automatically detect the GitHub Codespaces forwarded URL for port 5173
const codespaceHmrHost = process.env.CODESPACE_NAME 
    ? `${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
    : 'localhost';


export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        tailwindcss(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        // Inject headers to clear out the CORS block error in your console
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        hmr: {
            host: codespaceHmrHost,
            // FIX: If inside a Codespace proxy, do NOT append :5173 to the browser request URL
            clientPort: process.env.CODESPACE_NAME ? 443 : 5173,
            protocol: process.env.CODESPACE_NAME ? 'wss' : 'ws',
        },
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
