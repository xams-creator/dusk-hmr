import { PluginOption } from 'vite';

const REG_MODEL = /\.model.(tsx|ts|js|jsx)/;
const REG_MODEL_END = /\.model.(tsx|ts|js|jsx)$/;
const REG_MODEL_END_QM = /\.model.(tsx|ts|js|jsx)\?$/;

/*
 *   1.当正常导入 model 时, query为不带 v= 的字符串
 *   2.当使用dusk-plugin-vite 时，query将带 v=
 *
 * **/
export default function createViteDuskHmr(): PluginOption {
    return {
        name: 'vite-plugin-dusk-hmr',
        transform(code, id) {
            if (REG_MODEL.test(id)) {
                return {
                    code: `${code}

if (import.meta.hot) {
    const params = new URL(import.meta.url).searchParams;
    if (!params.has('v')) {
        import.meta.hot.accept((module) => {
            const app = window.__DUSK_PLUGIN_HMR_APP_RUNTIME__;
            if (app && module) {
                const model = module.default;
                if (model) {
                    app._mm.remove(model.namespace);
                    app.define(model);
                }
            }
        });
    }
}
`,
                };
            }
        },
        // handleHotUpdate({ server, modules }) {
        // const ids = [];
        // modules.forEach((module) => {
        //     if (/\.model.(tsx|ts|js|jsx)$/.test(module.id)) {
        //         ids.push(module.id);
        //         // @ts-ignore
        //         console.log(require(module.id).namespace)
        //     }
        // });
        // console.log('en')
        // server.ws.send({
        //     type: 'custom',
        //     event: 'dusk-model-update',
        //     data: { },
        // });
        // return [];
        // },
    };
}
