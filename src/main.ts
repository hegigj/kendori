import {bootstrap} from "../lib/bootstrap";
import {AppModule} from "./app/app.module";

export const classes = bootstrap(AppModule as any, document);
