import type { Configuration } from "webpack";
import webpack from "webpack";
import path from "path";
import StylelintPlugin from "stylelint-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import dotEnv from "dotenv";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const root = path.join(__dirname, "../");

// 不传参的话默认为会调用process.cwd(); 返回node.js进程的当前工作目录， 然后加载工作目录下的.env文件
dotEnv.config({
    path: path.join(root, ".env.dev") // 也可以自己指定工作目录文件
});
// console.log(process.env.S3_BUCKET); 打印env.dev文件中配置的环境变量

const isBuildMode=  process.env.NODE_ENV === "production";

// vue-loader-plugin 负责处理后缀名为vue的文件将其打包成一个js脚本  
export default {
    target: "web",
    mode: isBuildMode ? "production" : "development",
    entry: {
        app: path.join(root, "src", "main.ts")
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: "ts-loader",
                    options: {
                        // 让ts-loader去处理.vue文件中的lang=ts的代码给它编译出js来
                        appendTsSuffixTo: [/.vue$/],
                    }
                }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ isBuildMode ? MiniCssExtractPlugin.loader : "style-loader", "css-loader",  "postcss-loader", "sass-loader"]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.vue$/i,
                loader: "vue-loader",
                options: {
                    
                }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                // 输出一个url
                type: "assets/resource"
            },
            {
                test: /\.svg/,
                // 输出一个data-url
                type: "assets/inline"
            }
        ]
    },
    output: {
        chunkFilename: "[id].[chunkhash:8].js",
        filename: "[name].[contenthash:8].bundle.js",
        path: path.join(root, "dist")
    },
    resolve: {
        alias: {
            "@": path.join(root, "src"),
        },
        extensions: [".tsx", ".ts", ".js"],
        modules: ["node_modules"],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            name: "vendor"
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        // 指定每次热更新后或者打包后，lint css代码
        new StylelintPlugin({
            configFile: path.join(root, ".stylelintrc.js"),
            fix: true,
            lintDirtyModulesOnly: false, // 启动时必须检查一遍
            threads: true,
            extensions: ["css", "scss", "sass"],
            cache: true,
        }),
        new CleanWebpackPlugin({
            verbose: true,
        }),
        new HtmlWebpackPlugin({
            template: path.join(root, "src", "index.html"),
        }),
        new ESLintPlugin({
            extensions: ["js", "ts", "vue"],
            fix: true,
            threads: true,
            lintDirtyModulesOnly: false, // 启动时必须检查一遍
            // quiet: true, // 忽略lint的警告、但会处理错误报告错误
            emitWarning: true, // report warning
        }),
        // 定义全局的变量，会自动内联到代码里面， 这里定义了一个全局的判断是否为生产环境的键
        new webpack.DefinePlugin({
            PRODUCTION: isBuildMode,
            // 禁止devtools在生产环境的使用
            __VUE_PROD_DEVTOOLS__: true,
            // 放弃选项式api的bundle (虽然Vue3仍然支持 options api 的写法，但是组合式API的出现是可以完全替代vue2的。设置为true
            // 将在打包时擦除所有的vue2 的options api，减轻打包体积)
            __VUE_OPTIONS_API__: true,
        })
    ]
} as Configuration;