import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/common/shared.module";
import { Feature1Component } from "./feature-1.component";
import { Feature1RoutingModule } from "./feature-1.routing";

@NgModule(
    {
        declarations:[Feature1Component],

        imports:[
            SharedModule,
            Feature1RoutingModule
        ]
    })
export class Feature1Module{}