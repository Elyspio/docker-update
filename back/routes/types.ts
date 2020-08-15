import {Request} from "express";
import {ContainerId} from "../core/types";

export interface CustomRequest<T> extends Request {
    body: T
}

export type WatchBody = ContainerId

