import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/common/shared.module";
import { Feature2Component } from "./feature-2.component";
import { Feature2RoutingModule } from "./feature-2.routing";

@NgModule(
    {
        declarations:[Feature2Component],

        imports:[
            SharedModule,
            Feature2RoutingModule
        ]
    })
export class Feature2Module{}