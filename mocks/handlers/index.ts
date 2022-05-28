import { apiHandlers } from "./api";
import { youCanHandlers } from "./youcanpay";


export const handlers = [...youCanHandlers, ...apiHandlers]