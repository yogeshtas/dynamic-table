import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from "src/app/service/table.service";
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";

const USER_INFO = [
  {"name": "John Smith", "occupation": "Advisor", "age": 36},
  {"name": "Muhi Masri", "occupation": "Developer", "age": 28},
  {"name": "Peter Adams", "occupation": "HR", "age": 20},
  {"name": "Lora Bay", "occupation": "Marketing", "age": 43}
];

// const USER_SCHEMA = {
//   "name": "text",
//   "occupation": "text",
//   "age": "number",
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title = 'DynamicTable';
  displayedColumns: string[] = ['name', 'occupation', 'age'];
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
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
}
