import { CracoPlugin, CracoPluginDefinition } from '@craco/types';

const REG_MODEL = /\.model.(tsx|ts|js|jsx)/;

function defineCracoPlugin(plugin: CracoPlugin): CracoPluginDefinition<any> {
    return {
        plugin,
    };
}

export default function createCracoDuskHmr() {
    return defineCracoPlugin({
        overrideWebpackConfig({ webpackConfig: webpack }) {
            webpack.module?.rules?.push(
                {
                    test: [REG_MODEL],
                    loader: require.resolve('@xams-framework/dusk-loader-hmr'),
                },
            );
            return webpack;
        },
    });
}
