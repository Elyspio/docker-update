import {Router} from "express";
import {CustomRequest, WatchBody} from "./types";
import {Assembler, Docker} from "../core/docker/docker";
import {Storage} from "../core/storage";

let dockerHubAPI = require('docker-hub-api');

export const router = Router();

const cacheFile = "docker.json";

router.get("/cache", async (req, res) => {
    res.json(await Storage.read(cacheFile, "json"));
})

router.get("/", async (req, res) => {
    const list = await Docker.getContainers();
    res.json(list.map(Assembler.dataToWeb))
})

router.post("/watch", async (req: CustomRequest<WatchBody>, res) => {
    const container = (await Docker.getContainers()).find(c => c.containerId === req.body.containerId)
    const cache = await Storage.read(cacheFile, "json");
    await Storage.store(cacheFile, {[container.containerId]: container, ...cache})
    res.sendStatus(200);
})
