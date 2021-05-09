import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/common/shared.module";
import { Feature5Component } from "./feature-5.component";
import { Feature5RoutingModule } from "./feature-5.routing";
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';

import * as fromMain from './main.reducer';

@NgModule(
    {
        declarations:[Feature5Component],

        imports:[
            SharedModule,
            HttpClientModule,
            StoreModule.forRoot(fromMain.mainReducer),
            Feature5RoutingModule
        ]
    })
export class Feature5Module{}