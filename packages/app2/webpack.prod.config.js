/*
 * @description: webpack5配置
 * @Author: austin wong
 * @Date: 2021-04-16 13:26:28
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const config = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
            template: 'index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets'
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: './index.css'
        }),
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: "app1",
            // library: { type: "var", name: "yj-nc" },
            filename: "remoteEntry.js",
            remotes: {
              'main': "main@http://localhost:3000/remoteEntry.js"
            },
            exposes: {
              './Test': "./src/components/test.vue"
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
                        cacheDirectory: true,
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['import', {
                                "libraryName": "antd",
                                "style": true,   // or 'css'
                            }, 'antd']
                        ]
                    }
                }],
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
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
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
};

module.exports = (env) => {
    console.log(`当前执行${env.mode}模式`);
    // 如果是开发模式，

    return config;
}