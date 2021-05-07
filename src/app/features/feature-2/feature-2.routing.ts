import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Feature2Component } from "./feature-2.component";

const ROUTES:Routes=[
    {
        path:'',
        component:Feature2Component
    }
];

@NgModule(
    {
        imports:[RouterModule.forChild(ROUTES)],
        exports:[RouterModule] //Export this module so that we can use the Routing services-
        //- in the module which uses this routing configuration
    })
export class Feature2RoutingModule{}