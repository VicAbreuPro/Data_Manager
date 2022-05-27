/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

const ESLintPlugin = require('eslint-webpack-plugin')

const { configure } = require('quasar/wrappers')

module.exports = configure(function(ctx) {
    return {
        // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
        supportTS: false,

        // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
        // preFetch: true,

        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://v2.quasar.dev/quasar-cli-webpack/boot-files
        boot: [

            'axios'
        ],

        // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
        css: [
            'app.scss'
        ],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // 'ionicons-v4',
            // 'mdi-v5',
            // 'fontawesome-v6',
            // 'eva-icons',
            // 'themify',
            // 'line-awesome',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

            'roboto-font', // optional, you are not bound to it
            'material-icons' // optional, you are not bound to it
        ],

        // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
        build: {
            vueRouterMode: 'history', // available values: 'hash', 'history'
            env: {
                API_VNA_VTKN: "https://apivna30.azurewebsites.net/Internal/UserType/",
                API_VNA_TUSR: "https://apivna30.azurewebsites.net/Internal/Total_users",
                API_VNA_TADM: "https://apivna30.azurewebsites.net/Internal/Total_admins",
                API_VNA_LENT: "https://apivna30.azurewebsites.net/Internal/Last_entry",
                API_VNA_GUSR: "https://apivna30.azurewebsites.net/Internal/Get_users",
                API_VNA_VLOG: "https://apivna30.azurewebsites.net/Internal/Login",
                API_VNA_ADUS: "https://apivna30.azurewebsites.net/Internal/NewUser",
                API_VNA_GCLI: "https://apivna30.azurewebsites.net/Client/ClientList",
                API_VNA_PCLI: "https://apivna30.azurewebsites.net/Client/AddClient",
                API_VNA_UCLI: "https://apivna30.azurewebsites.net/Client/UpdateClient",
                API_VNA_DCLI: "https://apivna30.azurewebsites.net/Client/DeleteClient",
                API_VNA_GCBC: "https://apivna30.azurewebsites.net/Client/GetClientByChar",
                API_VNA_GONC: "https://apivna30.azurewebsites.net/Client/Client",
                API_VNA_GSAL: "https://apivna30.azurewebsites.net/Sales/SalesList",
                API_VNA_GSBC: "https://apivna30.azurewebsites.net/Sales/GetSalesByChar",
                API_VNA_PSAL: "https://apivna30.azurewebsites.net/Sales/AddSale",
                API_VNA_DSAL: "https://apivna30.azurewebsites.net/Sales/DeleteSale",
                API_VNA_GONS: "https://apivna30.azurewebsites.net/Sales/Sale",
                API_VNA_GPRO: "https://apivna30.azurewebsites.net/Product/ProductList",
                API_VNA_UPRO: "https://apivna30.azurewebsites.net/Product/UpdateProduct",
                API_VNA_GPBC: "https://apivna30.azurewebsites.net/Product/GetProductByChar",
                API_VNA_GONP: "https://apivna30.azurewebsites.net/Product/Product",
                API_VNA_DPRO: "https://apivna30.azurewebsites.net/Product/DeleteProduct",
                API_VNA_PSTK: "https://apivna30.azurewebsites.net/Product/AddProduct",
                API_VNA_USAL: "https://apivna30.azurewebsites.net/Sales/UpdateSale",
                API_VNA_GSUP: "https://apivna30.azurewebsites.net/Supplier/SupplierList",
                API_EXC_COIN: "https://api.exchangerate.host/latest",
            },

            // transpile: false,
            // publicPath: '/',

            // Add dependencies for transpiling with Babel (Array of string/regex)
            // (from node_modules, which are by default not transpiled).
            // Applies only if "transpile" is set to true.
            // transpileDependencies: [],

            // rtl: true, // https://quasar.dev/options/rtl-support
            // preloadChunks: true,
            // showProgress: false,
            // gzip: true,
            // analyze: true,

            // Options below are automatically set depending on the env, set them if you want to override
            // extractCSS: false,

            // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
            // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

            chainWebpack(chain) {
                chain.plugin('eslint-webpack-plugin')
                    .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
            }

        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
        devServer: {
            server: {
                type: 'http'
            },
            port: 8080,
            open: true // opens browser window automatically
        },

        // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
        framework: {
            config: { dark: 'auto' },

            // iconSet: 'material-icons', // Quasar icon set
            // lang: 'en-US', // Quasar language pack

            // For special cases outside of where the auto-import strategy can have an impact
            // (like functional components as one of the examples),
            // you can manually specify Quasar components/directives to be available everywhere:
            //
            // components: [],
            // directives: [],

            // Quasar plugins
            plugins: ['Notify']
        },

        // animations: 'all', // --- includes all animations
        // https://quasar.dev/options/animations
        animations: [],

        // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
        ssr: {
            pwa: false,

            // manualStoreHydration: true,
            // manualPostHydrationTrigger: true,

            prodPort: 3000, // The default port that the production server should use
            // (gets superseded if process.env.PORT is specified at runtime)

            maxAge: 1000 * 60 * 60 * 24 * 30,
            // Tell browser when a file from the server should expire from cache (in ms)

            chainWebpackWebserver(chain) {
                chain.plugin('eslint-webpack-plugin')
                    .use(ESLintPlugin, [{ extensions: ['js'] }])
            },

            middlewares: [
                ctx.prod ? 'compression' : '',
                'render' // keep this as last one
            ]
        },

        // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
        pwa: {
            workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
            workboxOptions: {}, // only for GenerateSW

            // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
            // if using workbox in InjectManifest mode

            chainWebpackCustomSW(chain) {
                chain.plugin('eslint-webpack-plugin')
                    .use(ESLintPlugin, [{ extensions: ['js'] }])
            },

            manifest: {
                name: 'VNA MANAGER 2.0',
                short_name: 'VNA MANAGER 2.0',
                description: 'Data Manager Web App',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#027be3',
                icons: [{
                        src: 'icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-256x256.png',
                        sizes: '256x256',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-384x384.png',
                        sizes: '384x384',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
        electron: {
            bundler: 'packager', // 'packager' or 'builder'

            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',

                // Windows only
                // win32metadata: { ... }
            },

            builder: {
                // https://www.electron.build/configuration/configuration

                appId: 'package.json'
            },

            // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

            chainWebpackMain(chain) {
                chain.plugin('eslint-webpack-plugin')
                    .use(ESLintPlugin, [{ extensions: ['js'] }])
            },

            chainWebpackPreload(chain) {
                chain.plugin('eslint-webpack-plugin')
                    .use(ESLintPlugin, [{ extensions: ['js'] }])
            }

        }
    }
})