import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatIconModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatRadioModule,
        MatSnackBarModule,
        MatIconModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule
    ],
    exports: [
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatRadioModule,
        MatSnackBarModule,
        MatIconModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule
    ],
    providers: [
        MatDatepickerModule
    ]
})

export class MaterialModule { }