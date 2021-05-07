import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Feature4Component } from "./feature-4.component";

const ROUTES:Routes=[
    {
        path:'',
        component:Feature4Component
    }
];

@NgModule(
    {
        imports:[RouterModule.forChild(ROUTES)],
        exports:[RouterModule] //Export this module so that we can use the Routing services-
        //- in the module which uses this routing configuration
    })
export class Feature4RoutingModule{}