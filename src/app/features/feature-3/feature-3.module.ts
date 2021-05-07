import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/common/shared.module";
import { Feature3Component } from "./feature-3.component";
import { Feature3RoutingModule } from "./feature-3.routing";
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Component3Component } from './component3/component3.component';
import { Component4Component } from './component4/component4.component';

@NgModule(
    {
        declarations:[Feature3Component,
             Component1Component,
              Component2Component,
               Component3Component,
                Component4Component],

        imports:[
            SharedModule,
            Feature3RoutingModule
        ]
    })
export class Feature3Module{}