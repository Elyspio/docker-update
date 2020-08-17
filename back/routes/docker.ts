import {Router} from "express";
import {CustomRequest, WithContainerId} from "./types";
import {Assembler, Docker} from "../core/docker/docker";
import {Storage} from "../core/storage";

let dockerHubAPI = require('docker-hub-api');

export const router = Router();

router.get("/cache", async (req, res) => {
    res.json(await Storage.read());
})

router.get("/", async (req, res) => {
    const list = await Docker.getContainers();
    res.json(list.map(Assembler.dataToWeb))
})

router.post("/watch", async (req: CustomRequest<WithContainerId>, res) => {
    // const container = (await Docker.getContainers()).find(c => c.containerId === req.body.containerId)
    // const cache = await Storage.read();
    // await Storage.store(cacheFile, {[container.containerId]: container, ...cache})

    res.sendStatus(200);
})


router.post("/update", async (req: CustomRequest<WithContainerId>, res, next) => {
    try {
        await Docker.updateDocker({containerId: req.body.containerId})
        res.sendStatus(200);
    }
    catch (e) {
        next(e)
    }

})


router.get("/toto", (req, res) => {
    res.json({toto: "tutu"})
})
