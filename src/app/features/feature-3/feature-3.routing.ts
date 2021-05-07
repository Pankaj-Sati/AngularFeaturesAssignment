import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Feature3Component } from "./feature-3.component";

const ROUTES:Routes=[
    {
        path:'',
        component:Feature3Component
    }
];

@NgModule(
    {
        imports:[RouterModule.forChild(ROUTES)],
        exports:[RouterModule] //Export this module so that we can use the Routing services-
        //- in the module which uses this routing configuration
    })
export class Feature3RoutingModule{}