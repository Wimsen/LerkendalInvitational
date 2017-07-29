const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

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
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'less-loader' ]
                })
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
            chunks: [ 'app', 'styles' ]
        }),
        new ExtractTextPlugin( '[name].css' )
    ]
};

module.exports = config;
