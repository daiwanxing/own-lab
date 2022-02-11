import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackBar from "webpackbar";
import TerserPlugin from "terser-webpack-plugin";

export default merge(common, {
    devtool: "inline-source-map",
    plugins: [
        // sourcemap devltool plugin可以对生成的内容
        // 进行更加细粒度的控制
        new MiniCssExtractPlugin(),
        // 查看打包构建进度
        new WebpackBar({
            profile: true,
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                format: {
                    // 将注释从build中删除掉
                    comments: false
                },
            },
            extractComments: false,
        })]
    }
} as Configuration);
