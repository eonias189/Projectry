const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/frontend/index.tsx",
    module: {
        rules: [
            {
                loader: "ts-loader",
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public/js"),
    },
};
