const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: [
            'babel-polyfill',
            './app/index.js',
            './app/static/js/popper.min.js',
            './app/static/js/bootstrap.min.js',
            './app/static/js/mdb.min.js'
        ],
        styles: ['./app/static/styles/styles.less']
    },

    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }, {
                test: [
                    /\.less$/, /\.css$/
                ],
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.(otf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }, {
                //IMAGE LOADER
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new webpack.ProvidePlugin({
             $: "jquery",
             jQuery: "jquery"
         }),
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            filename: 'index.html',
            inject: 'body',
            chunks: ['app', 'styles']
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devtool: 'source-map',
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8080,
        inline: true,
        hot: true,
        stats: 'errors-only',
        proxy: {
            '!/**/*.{css,js,hot-update.json}': {
                target: 'http://localhost:8079',
                secure: false
            }
        }
    }
};

module.exports = config;
