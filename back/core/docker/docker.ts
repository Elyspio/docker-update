import {Container, ContainerId, ContainerJson} from "./types";

import dayjs from "dayjs";
import {SocketReturn} from "./types/docker-cli";
import {run} from "../../util/run";
import {Storage} from "../storage";

export namespace Assembler {

    export function dataToWeb(source: Container): ContainerJson {
        return {
            ...source,
            created: source.created.toISOString()
        }
    }
}


export namespace Docker {
    export async function getContainers(): Promise<Container[]> {

        const socket = process.env.DOCKER_SOCKET_PATH ?? "/var/run/docker.sock"

        const data: SocketReturn[] = JSON.parse(await run(`curl --unix-socket ${socket} http://localhost/containers/json`));

        return data.map(container => ({
            containerId: container.Id,
            created: dayjs(container.Created),
            ports: container.Ports.map(p => ({
                listen: p.IP,
                container: p.PrivatePort,
                host: p.PublicPort,
                protocol: p.Type as any
            })),
            status: container.Status,
            name: container.Names[0],
            image: container.Image,
            dockerComposeDirectory: container.Labels["com.docker.compose.project.working_dir"]
        }))
    }

    export async function updateDocker(container: ContainerId) {
        const cache: {[key in string] : Container} = await Storage.read();
        if(cache[container.containerId] === undefined) {
            throw new Error(`Could not find container with id=${container.containerId} in cache`)
        }
        return run(`cd ${cache[container.containerId].dockerComposeDirectory} && docker-compose up -d`)
    }


}

