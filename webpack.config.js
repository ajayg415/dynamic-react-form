const path = require('path');
const HTMLWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'], // Add relevant extensions
        modules: ['src', 'node_modules'] // Assuming your source files are in a 'src' directory
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    plugins: [new HTMLWebpackPlugin()]
};