

import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Huhn';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'User' },
      { route: 'Assets/:id',  moduleId: PLATFORM.moduleName('assets-selection'),name:'Assets' },
      { route: 'Main/:id',  moduleId: PLATFORM.moduleName('main-view'),name:'Main' }
    ]);
    this.router = router;
    this.router.refreshNavigation();

  }
}

