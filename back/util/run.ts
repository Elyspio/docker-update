import {promisify} from "util";
import {exec as _exec} from "child_process";

export const exec = promisify(_exec)

export async function run(command) {
    if (process.env.SSH_REMOTE_USER) {
        const ip = (await exec("/sbin/ip route|awk '/default/ { print $3 }'")).stdout;
        return (await exec(`ssh ${process.env.SSH_REMOTE_USER}@${ip} "${command}"`)).stdout
    }
    return (await exec(command)).stdout;
}


