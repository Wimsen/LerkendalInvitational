const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const config = {
    entry: {
        app: [
            'babel-polyfill',
            './app/index.js',
            './app/static/js/popper.min.js',
            './app/static/js/bootstrap.min.js',
            './app/static/js/mdb.min.js'
        ],
        styles: ['./app/static/styles/styles.less', 'react-chat-elements/dist/main.css']
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
            },
            {
                test: /\.(otf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
               //IMAGE LOADER
               test: /\.(jpe?g|png|gif|svg)$/i,
               loader: 'file-loader'
           }
        ]
    },

    resolve: {
        extensions: [ '.js', '.jsx' ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
         }),
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
