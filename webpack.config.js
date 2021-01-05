const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        open: true,
        hot: true
    },
    //devtool: 'inline-source-map',
    module: {
        rules: [
            {
            test: /\.js$/,
            include: [
                path.resolve(__dirname, "src")
            ],
            exclude: /node_modules/,
            use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ["@babel/preset-env", "@babel/preset-react"]
                    }
                }	
            }
        ]
    },
    output: {
		filename: "main.js",
        path: path.resolve(__dirname, "dist"), //__dirname is the root directory, where your project lives
	},	
    plugins: [new HtmlWebpackPlugin({template: './src/index.html'})]
}