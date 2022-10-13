import { ScrawlsController } from "./Controllers/ScrawlsController.js";

class App {
  scrawlsController = new ScrawlsController()
}

window["app"] = new App();
