import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from '../class/element/element';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {
  displayedColumns: string[] = ['elementId', 'label'];
  dataSource: MatTableDataSource<Element>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tabElement: Array<Element>;


  Element: Element;
  inputId: number;
  inputLabel: string;
  radioButton: boolean;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.tabElement = Array<Element>();
    const httpOptions = {
      headers: new HttpHeaders({

        'Content-Type': 'application/json'

      })
    };

    this.http.get<Element[]>('https://localhost:44378/api/Elements', httpOptions).subscribe(
      jsonData => {
        if (jsonData) {
          for (const unElement of jsonData) {
            this.Element = unElement;

            this.tabElement.push(this.Element);
            this.dataSource = new MatTableDataSource(this.tabElement);
            this.refreach();

          }
        }
      }
    );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.tabElement);
    this.radioButton = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public refreach() {
    this.inputId = null;
    this.inputLabel = null;
    this.radioButton = false;
    this.ngAfterViewInit();
  }

  public selectElement(unElement: Element) {
    this.Element = unElement;
    this.inputId = unElement.elementId
    this.inputLabel = unElement.label;


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Nombre de ligne par page:';
  }

  public majElement() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.Element.label = this.inputLabel;

    this.http.put<any>('https://localhost:44378/api/Elements/' + this.Element.elementId, this.Element, httpOptions).subscribe(
      jsonData => {
        this.refreach();
        this.ngOnInit();

      }
    );



  }

  public insertElement() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<any>('https://localhost:44378/api/Elements', { label: this.inputLabel }, httpOptions).subscribe(
      jsonData => {
        this.refreach();
        this.ngOnInit();
      }
    );
  }

  public deleteElement() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.delete<any>('https://localhost:44378/api/Elements/' + this.Element.elementId, httpOptions).subscribe(
      jsonData => {
        this.tabElement.splice(this.tabElement.indexOf(this.Element));
        this.refreach();
      }
    );
  }

  _compareFn(a, b) {
    let result = false;
    if (a && b) {
      if (a == b) {
        result = true;
      }
    }
    return result;
  }

}
