import path from "path";
import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common, { root } from "./webpack.common";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import apiMocker from "mocker-api";

export default merge(common, {
    devtool: "eval-source-map",
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
        port: "auto",
        open: true,
        hot: true,
        setupMiddlewares (middlewares: unknown, devServer: any) {
            apiMocker(devServer.app, path.resolve(root, "src/mock/index.ts"), {
                // proxy: {
                //     "/api/(.*)": "http://127.0.0.1:3721/"
                // },
                changeHost: true,
            });
            return middlewares;
        }
    },
    plugins: [
        // sourcemap devltool plugin可以对生成的内容
        // 进行更加细粒度的控制
        new MiniCssExtractPlugin(),
    ]
} as Configuration);
