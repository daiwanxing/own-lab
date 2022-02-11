import path from "path";
import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common, { root } from "./webpack.common";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default merge(common, {
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
