const path = require('path');
const webpack = require('webpack');

          
module.exports = {

    entry: {
        'simple-timepicker': path.resolve(__dirname, 'src') + '/SimpleTimePicker.js',
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /.js[x]?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                use: 'babel-loader',
            },
            {
              test: /\.scss|css$/,
              use: [
                'style-loader',
                'css-loader',
                'sass-loader'
              ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|ico|png|jpe?g|gif)$/,
                use: ['file-loader?name=[name].[ext]&outputPath=assets/images/',
                      'image-webpack-loader']
            },
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin()
    ]
};