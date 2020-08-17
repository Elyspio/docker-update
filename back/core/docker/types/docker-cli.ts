export interface SocketReturn {
    Id:              string;
    Names:           string[];
    Image:           string;
    ImageID:         string;
    Command:         string;
    Created:         number;
    Ports:           Port[];
    Labels:          Labels;
    State:           string;
    Status:          string;
    HostConfig:      HostConfig;
    NetworkSettings: NetworkSettings;
    Mounts:          Mount[];
}

export interface HostConfig {
    NetworkMode: string;
}

export interface Labels {
    "com.docker.compose.config-hash"?:          string;
    "com.docker.compose.container-number"?:     string;
    "com.docker.compose.oneoff"?:               string;
    "com.docker.compose.project"?:              string;
    "com.docker.compose.project.config_files"?: string;
    "com.docker.compose.project.working_dir"?:  string;
    "com.docker.compose.service"?:              string;
    "com.docker.compose.version"?:              string;
}

export interface Mount {
    Type:        "bind" | "volume";
    Source:      string;
    Destination: string;
    Mode:        string;
    RW:          boolean;
    Propagation: string;
    Name?:       string;
    Driver?:     string;
}

export interface NetworkSettings {
    Networks: Networks;
}

export type Networks = {
    [key in string] : Bridge;
}

export interface Bridge {
    IPAMConfig:          null;
    Links:               null;
    Aliases:             null;
    NetworkID:           string;
    EndpointID:          string;
    Gateway:             string;
    IPAddress:           string;
    IPPrefixLen:         number;
    IPv6Gateway:         string;
    GlobalIPv6Address:   string;
    GlobalIPv6PrefixLen: number;
    MacAddress:          string;
    DriverOpts:          null;
}

export interface Port {
    IP:          string;
    PrivatePort: number;
    PublicPort:  number;
    Type:        string;
}
