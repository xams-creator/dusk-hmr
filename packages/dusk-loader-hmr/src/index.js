module.exports = (source) => {
    return `${source}

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        const REG = /\\.(tsx|ts|js|jsx)/;
        const paths = module.id.split('/');
        const path = paths[paths.length - 1].replace(REG, '');
        import('./' + path).then((module) => {
            const app = window.__DUSK_PLUGIN_HMR_APP_RUNTIME__;
            if (app && module) {
                const model = module.default;
                if (model) {
                    app._mm.remove(model.namespace);
                    app.define(model);
                }
            }
        });
    });
}
`;
};
