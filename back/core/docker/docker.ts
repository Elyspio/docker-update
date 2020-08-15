import {dockerCommand} from "docker-cli-js";
import {Container, ContainerId, ContainerJson, ContainerLib, Port} from "./types";

import dayjs, {Dayjs} from "dayjs";
import {exec} from "child_process";
import {InspectResult} from "./types/docker-cli";

export namespace Assembler {

    export async function libToData(source: ContainerLib): Promise<Container> {

        const {ports, created, dockerComposeDirectory} = await Docker.getExtraData({containerId: source["container id"]})

        const obj: Container = {
            containerId: source["container id"],
            created,
            image: source.image,
            name: source.name,
            ports,
            status: source.status,
            dockerComposeDirectory
        }

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
        const promises = (await dockerCommand("ps")).containerList.map(Assembler.libToData)

        const containers = await Promise.all(promises) as Container[];

        return containers;
    }

    export async function getExtraData(container: ContainerId): Promise<{ created: Dayjs, dockerComposeDirectory: string, ports: Port[] }> {
        return new Promise((resolve, reject) => {
            exec(`docker inspect "${container.containerId}`, (error, stdout) => {
                if (error) reject(error);
                else {
                    const data: InspectResult = JSON.parse(stdout)[0];
                    const created = dayjs(data.Created);
                    const dockerComposeDirectory = data.Config.Labels["com.docker.compose.project.working_dir"];
                    const ports: Port[] = [];
                    Object.entries(data.NetworkSettings.Ports).forEach(([key, value]) => {
                        ports.push({
                            protocol: key.slice(key.indexOf("/") + 1) as any,
                            host: Number.parseInt(value.HostPort),
                            container: Number.parseInt(key.slice(key.indexOf("/"))),
                            listen: value.HostIp
                        })
                    })
                    resolve({
                        ports,
                        created,
                        dockerComposeDirectory
                    });
                }
            })
        })
    }
}

