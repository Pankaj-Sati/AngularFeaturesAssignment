import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/common/shared.module";
import { Feature4Component } from "./feature-4.component";
import { Feature4RoutingModule } from "./feature-4.routing";
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Component3Component } from './component3/component3.component';
import { Component4Component } from './component4/component4.component';
import { Feature4Service } from "./feature-4.service";

@NgModule(
    {
        declarations:[Feature4Component,
             Component1Component,
              Component2Component,
               Component3Component,
                Component4Component],

        imports:[
            SharedModule,
            Feature4RoutingModule
        ],
        providers:[Feature4Service]
    })
export class Feature4Module{}