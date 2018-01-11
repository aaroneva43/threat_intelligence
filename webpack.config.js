const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = (env = {}) => {

    const pkgPath = path.resolve(__dirname, 'package.json');
    const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};


    let theme = {};
    if (pkg.theme && typeof (pkg.theme) === 'string') {
        let cfgPath = pkg.theme;
        // relative path
        if (cfgPath.charAt(0) === '.') {
            cfgPath = path.resolve(__dirname, cfgPath);
        }
        const getThemeConfig = require(cfgPath);
        theme = getThemeConfig();
    } else if (pkg.theme && typeof (pkg.theme) === 'object') {
        theme = pkg.theme;
    }

    return {
        entry: {
            index: [SRC_DIR + '/index.js']
        },
        output: {
            path: BUILD_DIR,
            filename: '[name].bundle.js',
            publicPath: '/'
        },
        //watch: true,
        devtool: env.prod ? '' : 'inline-source-map',
        devServer: {
            contentBase: BUILD_DIR,
            historyApiFallback: true,
            // host: "0.0.0.0",
            port: 5000,
            compress: true,
            hot: true,
            // open: true
            proxy: { '/ips**': { target: 'http://104.239.230.184:5000', secure: false } }
        },
        // devServer: {
        //   contentBase: BUILD_DIR,
        //   //   port: 9001,
        //   compress: true,
        //   hot: true,
        //   open: true
        // },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            // presets: ['react', 'env'],
                            plugins: ["transform-decorators-legacy", "transform-object-rest-spread"]
                        }
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.(scss)$/,
                    use: ['css-hot-loader'].concat(extractSCSS.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: { alias: { '../img': '../public/img' }, module: false }
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ]
                    }))
                },
                {
                    test: /\.css$/,
                    use: extractCSS.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.less$/,
                    use: extractLess.extract({
                        use: [
                            {
                                loader: "css-loader"
                            },
                            {
                                loader: "less-loader",
                                options: { modifyVars: theme } // no need to JSON.stringify()
                            }
                        ],
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    use: [
                        {
                            // loader: 'url-loader'
                            loader: 'file-loader',
                            options: {
                                name: './img/[name].[hash].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: './fonts/[name].[hash].[ext]'
                    }
                }]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),

            new webpack.NamedModulesPlugin(),
            extractCSS,
            extractSCSS,
            new HtmlWebpackPlugin(
                {
                    inject: true,
                    template: './public/index.html'
                }
            ),
            new CopyWebpackPlugin([
                { from: './public/img', to: 'img' }
            ],
                { copyUnmodified: false }
            )
        ].concat(env.prod ? new webpack.optimize.UglifyJsPlugin({ sourceMap: true }) : []).
            concat(env.prod ? new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"production"'
                }
            }) : [])
    }
};