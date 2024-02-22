/*
 * @description: webpack5配置
 * @Author: austin wong
 * @Date: 2020-11-09 00:27:35
 */
const path = require('path');
const { HotModuleReplacementPlugin, IgnorePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const config = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: false,
        // publicPath: './dist',
        hot: true,
        port: 3002,
        open: false,
        // hotOnly: true,
        compress: true,
        overlay: true,
        disableHostCheck: true, //  新增该配置项
    },
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
            template: 'index.html'
        }),
        new IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: "app2",
            // library: { type: "var", name: "yj-nc" },
            filename: "remoteEntry.js",
            remotes: {
                'main': "main@http://localhost:3000/remoteEntry.js"
            },
            exposes: {
                './APP': "./src/pages/App.vue"
            },
            shared: []
        })
    ],
    module: {
        rules: [
            // babel使用runtime，避免将不需要的代码注入
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        // cacheDirectory: true,
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-runtime', ['import', {
                                "libraryName": "antd",
                                "style": true, // or 'css'
                            }, 'antd']
                        ]
                    }
                }],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    'primary-color': '#4608e2',
                                    'link-color': '#4608e2',
                                    'border-radius-base': '20px',
                                },
                                javascriptEnabled: true,
                            }
                        }
                    }
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
};


module.exports = (env) => {
    console.log(`当前执行${env.mode}模式`);

    return config;
}