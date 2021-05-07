import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Feature5Component } from "./feature-5.component";

const ROUTES:Routes=[
    {
        path:'',
        component:Feature5Component
    }
];

@NgModule(
    {
        imports:[RouterModule.forChild(ROUTES)],
        exports:[RouterModule] //Export this module so that we can use the Routing services-
        //- in the module which uses this routing configuration
    })
export class Feature5RoutingModule{}