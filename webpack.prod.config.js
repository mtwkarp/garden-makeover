const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const dotenv = require("dotenv");
const env = dotenv.config().parsed;


module.exports = {
    mode: 'production',

    entry: './src/index.ts',

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "os": false,
        }
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',  // Automatically inject the script into your HTML
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(env)
        }),
        new CopyPlugin({
            patterns: [
                { from:  './src/assets/', to: 'assets'},
            ],
        }),
        new CleanWebpackPlugin(),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: 'single',
    },

    performance: {
        hints: 'warning',
        maxEntrypointSize: 400000,
        maxAssetSize: 300000,
    },

    devtool: 'source-map',  // Generate source maps for production, but slower and optimized for debugging
};