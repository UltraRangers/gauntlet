import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '../common/shared.module';

import { MarketingHomeComponent } from './marketing';
import { MarketingRoutes } from './marketing.routes';

@NgModule({
  imports: [
    MarketingRoutes,
    SharedModule.forRoot()
  ],
  declarations: [
    MarketingHomeComponent
  ],
  exports: [
    MarketingHomeComponent
  ],
  entryComponents: [
      // TODO
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class MarketingModule {}
