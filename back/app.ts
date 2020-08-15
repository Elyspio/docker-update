import E, {Express} from "express"
import {router as docker} from "./routes/docker";
import {middlewares} from "./middleware/middleware";
import {ArgumentParser} from 'argparse'
import path from "path";

const express = require('express');
export const app: Express = express();

app.use(...middlewares);
app.use('/core', docker);

let frontPath = path.resolve(__dirname, "..", "front", "build");
app.use("/", E.static(frontPath))


if (require.main === module) {
    const parser = new ArgumentParser();
    parser.addArgument("--port", {type: "int", defaultValue: 4001})
    const args: { port: number } = parser.parseArgs();

    app.listen(args.port, () => {
        console.log("Starting server on port", args.port);
    })
}





