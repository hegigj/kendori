const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = (env) => {
    const { mode } = env;

    return {
        mode: mode || 'development',
        entry: './src/main.ts',
        output: {
            path: path.resolve(__dirname, 'dist/app'),
            filename: 'app.bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
            ]
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env.mode': JSON.stringify(mode)
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: `./src/index.html`,
                chunks: `./app.bundle.js`,
            }),
            // new CopyWebpackPlugin({
            //     patterns: [
            //         {
            //             from: `./src/assets`,
            //             to: 'assets'
            //         }
            //     ]
            // })
        ]
    };
};
