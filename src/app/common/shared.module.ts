import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UpperCasePipe } from "./upperCase.pipe";

@NgModule(
    {
        declarations:[UpperCasePipe],

        imports:[
            CommonModule, //TO make use of Build-in feautures of Angular
            FormsModule],

        exports:[CommonModule,
        FormsModule,
        UpperCasePipe]
    })
export class SharedModule{}