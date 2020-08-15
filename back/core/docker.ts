import {dockerCommand} from "docker-cli-js";
import {Container, ContainerId, ContainerJson, ContainerLib, Port} from "./types";

import dayjs, {Dayjs} from "dayjs";
import {exec} from "child_process";

export namespace Assembler {
    export function libToData(source: ContainerLib): Container {
        const obj: Container = {
            containerId: source["container id"],
            created: null,
            image: source.image,
            name: source.name,
            ports: [],
            status: source.status
        }

        source.ports.split(", ").forEach(portStr => {
            const slashIndex = portStr.lastIndexOf("/");
            const protocol = portStr.slice(slashIndex + 1)
            const port: Port = {
                protocol: protocol as any,
                container: -1,
                host: -1
            }
            let rest = portStr.slice(0, slashIndex);
            let doublePointIndex = rest.indexOf(":");
            if (doublePointIndex === -1) {
                port.container = port.host = Number.parseInt(rest);
            } else {
                port.listen = rest.slice(0, doublePointIndex);
                rest = rest.slice(doublePointIndex + 1);
                [port.host, port.container] = rest.split("->").map(x => Number.parseInt(x))
            }

            obj.ports.push(port);
        })

        const a = dayjs("");

        return obj;
    }

    export function dataToWeb(source: Container): ContainerJson {
        return {
            ...source,
            created: source.created.toISOString()
        }
    }
}


export namespace Docker {
    export async function getContainers(): Promise<Container[]> {
        const containers = (await dockerCommand("ps")).containerList.map(Assembler.libToData)

        await Promise.all(containers.map(async c => c.created = await getCreatedTime({containerId: c.containerId})))

        return containers;
    }

    export async function getCreatedTime(container: ContainerId): Promise<Dayjs> {
        return new Promise((resolve, reject) => {
            exec(`docker inspect -f "{{ .Created }}" ${container.containerId}`, (error, stdout) => {
                if (error) reject(error);
                else {
                    const str = stdout.split("\n")[0];
                    resolve(dayjs(str));
                }
            })
        })
    }
}

