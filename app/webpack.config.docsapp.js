const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const APPNAME = 'thinkhope';
const BASEDOMAIN = 'www.thinkho.pe';
const BASEPATH = '/app';
const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.APP_BASEPATH': JSON.stringify(BASEPATH + '/'),
    __DEV__: false
};

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
    },
    devtool: 'source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/
    entry: path.resolve(__dirname, 'src/index'),
    target: 'web',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../docs' + BASEPATH),
        // always load
        publicPath: 'https://' + BASEDOMAIN + BASEPATH + '/',
        filename: `${APPNAME}.js`
    },
    plugins: [
        // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
        new webpack.DefinePlugin(GLOBALS),

        // Generate an external css file with a hash in the filename
        new MiniCssExtractPlugin({
            filename: `${APPNAME}.css`
        }),

        // Create manifest.json
        new WebpackManifestPlugin(),

        // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
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
                minifyURLs: true
            },
            inject: true,
            // Note that you can add custom options here if you need to handle other custom logic in index.html
            // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
            trackJSToken: ''
        }),

    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/octet-stream',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            // search and replace react-script subs in files like index.html
            {
                test: /.*\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /.*\.html$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [
                        {
                            search: /%PUBLIC_URL%/g,
                            replace: '/app'
                        }
                    ]
                }
            },
            // process SCSS
            {
                test: /(\.css|\.scss|\.sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('cssnano'),
                                require('autoprefixer'),
                            ],
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'src')]
                            },
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
};
