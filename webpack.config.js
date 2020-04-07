const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: "./src/index.js",
        create: "./src/create/create.js"
    },
    // entry: './src/index.js',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 8080,
        host: `localhost`,
    },
    output: {
        filename: './[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        'modules': 'false',//commonjs,amd,umd,systemjs,auto
                                        'useBuiltIns': 'usage',
                                        'targets': '> 0.25%, not dead',
                                        'corejs': 3
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: false,
                    },
                },
            }
        ]
    },
    resolve: {
        alias: {}
    },
    plugins: [],

};