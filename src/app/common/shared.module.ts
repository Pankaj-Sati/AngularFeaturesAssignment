import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@NgModule(
    {
        imports:[
            CommonModule, //TO make use of Build-in feautures of Angular
            FormsModule],

        exports:[CommonModule,
        FormsModule]
    })
export class SharedModule{}