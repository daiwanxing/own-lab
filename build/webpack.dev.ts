import path from "path";
import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common, { root } from "./webpack.common";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default merge(common, {
    mode: "development",
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
                use: [MiniCssExtractPlugin.loader, "css-loader",  "postcss-loader", "sass-loader"]
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
    devServer: {
        client: {
            progress: true,
            overlay: {
                errors: true, // 在热更新时全屏出现编译错误
                warnings: false, // 只在控制台出现编译警告
            }
        },
        static: path.join(root, "dist"),
        // 启动G-ZIP
        compress: true,
        port: 9000,
        open: true,
        hot: true,
    },
    plugins: [
        // sourcemap devltool plugin可以对生成的内容
        // 进行更加细粒度的控制
        new MiniCssExtractPlugin(),
    ]
} as Configuration);
