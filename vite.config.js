import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            },
            manifest: {
                'theme_color': '#00948f',
                'background_color': '#f7f8f8',
                'icons': [{
                    'purpose': 'maskable',
                    'sizes': '512x512',
                    'src': 'icon512_maskable.png',
                    'type': 'image/png'
                }, { 'purpose': 'any', 'sizes': '512x512', 'src': 'icon512_rounded.png', 'type': 'image/png' }],
                'orientation': 'portrait',
                'display': 'standalone',
                'dir': 'auto',
                'lang': 'en-US',
                'name': 'IotSafeDrive',
                'short_name': 'iotsafedrive'
            }
        }),


        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false // css in js
                })
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
