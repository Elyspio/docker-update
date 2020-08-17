import {basename, dirname, resolve,} from "path";
import {promises} from "fs";

const {writeFile, readFile} = promises

export const filename = "docker.json"

export namespace Storage {

    function getRealPath(name: string = filename) {
        return resolve(__dirname, "..", "data", name);
    }

    async function exists(path: string) {
        return (await promises.readdir(dirname(path))).includes(basename(path));
    }

    export async function store(name: string = filename, obj: any) {
        return writeFile(getRealPath(name), JSON.stringify(obj));
    }

    export async function read(name: string = filename, format: "json" | "text" = "json") {
        let path = getRealPath(name)

        if (!await exists(path)) {
            await store(name, {});
            return {}
        }

        const raw = (await readFile(path)).toString();
        if (format === "json") return JSON.parse(raw);
        return raw;
    }
}
