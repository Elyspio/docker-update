import {Dayjs} from "dayjs";

export type ContainerLib = {
    "container id": string;
    image: string;
    command: string;
    created: string;
    status: string;
    ports: string;
    name: string;
};

export type Port = {
    host: number,
    container: number,
    listen?: string,
    protocol: "tcp" | "udp"
};
export type Container = {
    containerId: string;
    image: string;
    created: Dayjs;
    status: string;
    ports: Port[];
    name: string;
}

export type ContainerJson = Omit<Container, "created"> & {
    created: string
}


export interface DockerPsResult {
    containerList: ContainerLib[],
    raw: string
}


export type ContainerId = Pick<Container, "containerId">
