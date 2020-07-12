const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        items: "./src/items/items.js",
        createItem: "./src/items/create/create.js",
        editItem: "./src/items/edit/edit.js",
        categories: "./src/categories/categories.js",
        createCategory: "./src/categories/create.js",
        pubsub: "./src/pubsub.js"
    },
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
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
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
        alias: {},
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [],

};