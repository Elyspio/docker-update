import {Request} from "express";
import {ContainerId} from "../core/docker/types";

export interface CustomRequest<T> extends Request {
    body: T
}

export type WatchBody = ContainerId

