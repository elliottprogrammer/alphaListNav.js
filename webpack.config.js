const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    return {
        entry: './alphaListNav.js',
        output: {
            filename: 'alphaListNav.min.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'AlphaListNav',
            libraryTarget: 'var',
            libraryExport: 'default',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                ["@babel/plugin-proposal-class-properties", { "loose": true }],
                                //['@babel/plugin-proposal-object-rest-spread'],
                            ]
                        }
                    }
                },
                {
                    test: /\.(sc|c)ss$/,
                    use: [
                        env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function() { return [require('autoprefixer')]; }
                            }
                        },
                        {
                            loader: 'sass-loader',

                        },
                    ]
                }
            ]
        },
        devServer: {
            contentBase: './dist',
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "alphaListNav.min.css",
            }),
        ]
    }
}