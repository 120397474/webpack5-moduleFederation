const path = require('path');
const { HotModuleReplacementPlugin, IgnorePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
        port: 3000,
        open: true,
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
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin({
            name: "main",
            // library: { type: "var", name: "main" },
            filename: "remoteEntry.js",
            remotes: {
                'app1': "app1@http://localhost:3001/remoteEntry.js",
                'app2': "app2@http://localhost:3002/remoteEntry.js"
            },
            exposes: {},
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
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
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
            },
            // file-laoder加载图片
            {
                test: /\.(jpg|png|jpeg|gif|svg)$/,
                use: ['file-loader']
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