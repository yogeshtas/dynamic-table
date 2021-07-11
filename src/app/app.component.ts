import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from "./service/table.service";
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title = 'DynamicTable';
  displayedColumns: string[] = ['name', 'dob', 'city', 'email', 'phone number'];
  dataSource = new MatTableDataSource();
  dataSchema;
  
  constructor(private _tableService: TableService){
    
  }

  ngOnInit(){
     this.getUsers();
  }

  getUsers(){
    this._tableService.getUsers().subscribe(res => {
      let data = res["results"];
      let keys = Object.keys(data[0]);
      keys.splice(9)
      keys.splice (keys.indexOf('login'), 1); 
      this.displayedColumns = keys;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("Keys: " + JSON.stringify(keys));
      console.log("Internal Data: " + JSON.stringify(res["results"]));
      // this.dataSource = res;
    },
      error => {
        
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
