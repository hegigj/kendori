import {KdModule} from "../../lib/decorators/module.decorator";
import {AppComponent} from "./app.component";
import {AppService} from "./app.service";

@KdModule({
    declarations: [],
    providers: [AppService],
    bootstrap: AppComponent as any
})
export class AppModule {}
