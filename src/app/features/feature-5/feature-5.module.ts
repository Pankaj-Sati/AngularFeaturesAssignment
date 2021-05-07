import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/common/shared.module";
import { Feature5Component } from "./feature-5.component";
import { Feature5RoutingModule } from "./feature-5.routing";

@NgModule(
    {
        declarations:[Feature5Component],

        imports:[
            SharedModule,
            Feature5RoutingModule
        ]
    })
export class Feature5Module{}