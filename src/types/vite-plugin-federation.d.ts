declare module '@originjs/vite-plugin-federation' {
    import type { Plugin } from 'vite';
    interface FederationOptions {
        name?: string;
        filename?: string;
        exposes?: Record<string, string>;
        remotes?: Record<string, string>;
        shared?: Record<string, any>;
    }
    export default function federation(options: FederationOptions): Plugin;
}
