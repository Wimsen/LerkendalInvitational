const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const config = {
    entry: {
        app: [
            'babel-polyfill', './app/index.js'
        ],
        styles: [
            './app/styles/styles.less', './app/styles/bootstrap-grid.min.css'
        ],
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
                loaders: [ 'babel-loader' ]
            }, {
                test: [
                    /\.less$/, /\.css$/
                ],
                loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
            }, {
                test: /\.(otf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },

    resolve: {
        extensions: [ '.js', '.jsx' ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            filename: 'index.html',
            inject: 'body',
        }),
        new webpack.HotModuleReplacementPlugin( )
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
