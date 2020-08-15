export interface InspectResult {
    Id: string;
    Created: string;
    Path: string;
    Args: string[];
    State: State;
    Image: string;
    ResolvConfPath: string;
    HostnamePath: string;
    HostsPath: string;
    LogPath: string;
    Name: string;
    RestartCount: number;
    Driver: string;
    Platform: string;
    MountLabel: string;
    ProcessLabel: string;
    AppArmorProfile: string;
    ExecIDs: null;
    HostConfig: HostConfig;
    GraphDriver: GraphDriver;
    Mounts: Mount[];
    Config: Config;
    NetworkSettings: NetworkSettings;
}

export interface Config {
    Hostname: string;
    Domainname: string;
    User: string;
    AttachStdin: boolean;
    AttachStdout: boolean;
    AttachStderr: boolean;
    ExposedPorts: ExposedPorts;
    Tty: boolean;
    OpenStdin: boolean;
    StdinOnce: boolean;
    Env: string[];
    Cmd: string[];
    Image: string;
    Volumes: Volumes;
    WorkingDir: string;
    Entrypoint: string[];
    OnBuild: null;
    Labels: Labels;
}

export type  ExposedPorts = {
    [key in string]: HostIpPort;
}

export interface HostIpPort {
    "HostIp": string,
    "HostPort": string
}

export interface Labels {
    "com.docker.compose.config-hash": string;
    "com.docker.compose.container-number": string;
    "com.docker.compose.oneoff": string;
    "com.docker.compose.project": string;
    "com.docker.compose.project.config_files": string;
    "com.docker.compose.project.working_dir": string;
    "com.docker.compose.service": string;
    "com.docker.compose.version": string;
}

export type Volumes = {
    [key in string]: HostIpPort;
}

export interface GraphDriver {
    Data: Data;
    Name: string;
}

export interface Data {
    LowerDir: string;
    MergedDir: string;
    UpperDir: string;
    WorkDir: string;
}

export interface HostConfig {
    Binds: string[];
    ContainerIDFile: string;
    LogConfig: LogConfig;
    NetworkMode: string;
    PortBindings: Port;
    RestartPolicy: RestartPolicy;
    AutoRemove: boolean;
    VolumeDriver: string;
    VolumesFrom: any[];
    CapAdd: null;
    CapDrop: null;
    Capabilities: null;
    Dns: any[];
    DnsOptions: any[];
    DnsSearch: any[];
    ExtraHosts: null;
    GroupAdd: null;
    IpcMode: string;
    Cgroup: string;
    Links: null;
    OomScoreAdj: number;
    PidMode: string;
    Privileged: boolean;
    PublishAllPorts: boolean;
    ReadonlyRootfs: boolean;
    SecurityOpt: null;
    UTSMode: string;
    UsernsMode: string;
    ShmSize: number;
    Runtime: string;
    ConsoleSize: number[];
    Isolation: string;
    CpuShares: number;
    Memory: number;
    NanoCpus: number;
    CgroupParent: string;
    BlkioWeight: number;
    BlkioWeightDevice: null;
    BlkioDeviceReadBps: null;
    BlkioDeviceWriteBps: null;
    BlkioDeviceReadIOps: null;
    BlkioDeviceWriteIOps: null;
    CpuPeriod: number;
    CpuQuota: number;
    CpuRealtimePeriod: number;
    CpuRealtimeRuntime: number;
    CpusetCpus: string;
    CpusetMems: string;
    Devices: null;
    DeviceCgroupRules: null;
    DeviceRequests: null;
    KernelMemory: number;
    KernelMemoryTCP: number;
    MemoryReservation: number;
    MemorySwap: number;
    MemorySwappiness: null;
    OomKillDisable: null;
    PidsLimit: null;
    Ulimits: null;
    CpuCount: number;
    CpuPercent: number;
    IOMaximumIOps: number;
    IOMaximumBandwidth: number;
    MaskedPaths: string[];
    ReadonlyPaths: string[];
}

export interface LogConfig {
    Type: string;
    Config: HostIpPort;
}

export type Port =  {
    [key in string]: {
        HostIp: string;
        HostPort: string;
    }
}


export interface RestartPolicy {
    Name: string;
    MaximumRetryCount: number;
}

export interface Mount {
    Type: string;
    Source: string;
    Destination: string;
    Mode: string;
    RW: boolean;
    Propagation: string;
}

export interface NetworkSettings {
    Bridge: string;
    SandboxID: string;
    HairpinMode: boolean;
    LinkLocalIPv6Address: string;
    LinkLocalIPv6PrefixLen: number;
    Ports: Port;
    SandboxKey: string;
    SecondaryIPAddresses: null;
    SecondaryIPv6Addresses: null;
    EndpointID: string;
    Gateway: string;
    GlobalIPv6Address: string;
    GlobalIPv6PrefixLen: number;
    IPAddress: string;
    IPPrefixLen: number;
    IPv6Gateway: string;
    MacAddress: string;
    Networks: Networks;
}

export interface Networks {
    "external-server_default": ExternalServerDefault;
}

export interface ExternalServerDefault {
    IPAMConfig: null;
    Links: null;
    Aliases: string[];
    NetworkID: string;
    EndpointID: string;
    Gateway: string;
    IPAddress: string;
    IPPrefixLen: number;
    IPv6Gateway: string;
    GlobalIPv6Address: string;
    GlobalIPv6PrefixLen: number;
    MacAddress: string;
    DriverOpts: null;
}

export interface State {
    Status: string;
    Running: boolean;
    Paused: boolean;
    Restarting: boolean;
    OOMKilled: boolean;
    Dead: boolean;
    Pid: number;
    ExitCode: number;
    Error: string;
    StartedAt: Date;
    FinishedAt: Date;
}

