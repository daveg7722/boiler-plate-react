const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


const TARGET = process.env.npm_lifecycle_event;

const config = {
    mode: "development", 
    entry: './src/index.js',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        open: true,
        hot: true
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
            test: /\.js$/,
            include: [
                path.resolve(__dirname, "src")
            ],
            exclude: /node_modules/,
            use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [["@babel/preset-env", {"useBuiltIns": "usage", "corejs" : 3, "targets": "defaults"}], "@babel/preset-react"]
                    }
                }	
            }
        ]
    },
    output: {
		filename: "main.[hash].js",
        path: path.resolve(__dirname, "dist"), //__dirname is the root directory, where your project lives
	},	
    plugins: [new HtmlWebpackPlugin({template: './src/index.html'})]
}

if (TARGET == "build") {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin({filename: 'main.[hash].css'}), new CleanWebpackPlugin());
    config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;
}

module.exports = config;