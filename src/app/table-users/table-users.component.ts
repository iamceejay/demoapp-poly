import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from "../user";
import { UserService } from "../user.service";
import { DialogDeleteComponent } from "../dialog-delete/dialog-delete.component";

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})

export class TableUsersComponent implements OnInit {

  displayedColumns: string[] = ['user_fullname', 'user_email', 'user_address', 'updated_at', 'actions'];
  data: MatTableDataSource<User>;
  message: string;
  isEmpty = true;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this._renderTable()
  }

  private _renderTable() {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.data = new MatTableDataSource(users);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        this.isEmpty = (users.length !== 0) ? true : false;
      }, err => {
        console.log(err);
      });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'delete'){
        this.deleteUser(id);
      }
    });
  }

  deleteUser(id: string) {
    this.userService.destoryUser(id).subscribe(result => {
      this._renderTable()

      this._snackBar.open('User deleted', 'Okay',{
        duration: 3000
      })
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

}
