import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditDialog } from './edit-dialog/edit-dialog';
import { MatDialog } from '@angular/material/dialog';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },

  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },

  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },

  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },

  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },

  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },

  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },

  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },

  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },

  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private dialog: MatDialog) {}
  filterTimeout: any;
  protected title = 'periodic-table';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  editIndex: number | null = null;
  editValue: string = '';
  openEditDialog(index: number, field: keyof PeriodicElement) {
    const dialogRef = this.dialog.open(EditDialog, {
      data: {
        value: this.dataSource.data[index][field],
        position: field.toString(),
      },
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null && result !== undefined) {
        const data = this.dataSource.data.slice();
        data[index] = { ...data[index], [field]: result };
        this.dataSource.data = data;
        this.dataSource.filter = this.dataSource.filter;
        this.dataSource.sort = this.dataSource.sort;
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }, 2000);
  }
}
