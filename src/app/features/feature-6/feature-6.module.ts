import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/common/shared.module";
import { Feature6Component } from "./feature-6.component";
import { Feature6RoutingModule } from "./feature-6.routing";

@NgModule(
    {
        declarations:[Feature6Component],

        imports:[
            SharedModule,
            Feature6RoutingModule
        ]
    })
export class Feature6Module{}