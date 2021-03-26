import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArmeType } from '../class/arme_type/arme-type';
import { Personnage } from '../class/personnage/personnage';

@Component({
  selector: 'app-personnage',
  templateUrl: './personnage.component.html',
  styleUrls: ['./personnage.component.css']
})
export class PersonnageComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'rarete', 'image', 'arme_type_id', 'element_id'];
  dataSource: MatTableDataSource<Personnage>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tabPersonnage: Array<Personnage>;
  tabArmeType: Array<ArmeType>;
  tabElement: Array<Element>;
  
  Personnage: Personnage;
  inputId: number;
  inputNom : string;
  inputRarete : number;
  inputImage : string;
  selectArmeType : ArmeType;
  selectElement : Element;
  radioButton: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.tabPersonnage = Array<Personnage>();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.get<Personnage[]>('http://127.0.0.1:8000/api/personnages',httpOptions).subscribe(
      jsonData => {
        if (jsonData) {
          for (const unPersonnage of jsonData) {
            this.Personnage = unPersonnage;
            // this.Personnage.id = unPersonnage.id;
            // this.Personnage.op_nom = unPersonnage.op_nom;
            // this.Personnage.int_nom = unPersonnage.int_nom;
            this.tabPersonnage.push(this.Personnage);
            this.dataSource = new MatTableDataSource(this.tabPersonnage);
            this.refreach();
            this.radioButton = false;
          }
        }
      }
    );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.tabPersonnage);
    this.radioButton = false;
    this.getArmeType();
    this.getElement();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Nombre de ligne par page:';
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
    this.inputNom = null;
    this.inputRarete = null;
    this.inputImage = null;
    this.selectArmeType = null;
    this.selectElement = null;
    this.Personnage = null;
    this.radioButton = false;
    this.ngAfterViewInit();
  }

  public selectPersonnage(unPersonnage: Personnage) {
    this.Personnage = unPersonnage;
    this.inputId = unPersonnage.personnage_id;
    this.inputNom = unPersonnage.nom;
    this.inputRarete = unPersonnage.rarete;
    this.inputImage = unPersonnage.image;
    this.selectArmeType = unPersonnage.arme_type_id;
    this.selectElement = unPersonnage.element_id;
  }

  public insertPersonnage() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.Personnage = new Personnage();
    this.http.post<any[]>('http://localhost/API_REST/index.php?section=Personnage&action=insert', this.Personnage, httpOptions).subscribe(
      jsonData => {
        if (jsonData['_id'].id) {
          this.refreach();
          this.ngOnInit();
        }
      }
    );
  }

  public majPersonnage() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.Personnage.nom = this.inputNom;
    this.Personnage.rarete = this.inputRarete;
    this.Personnage.image = this.inputImage;
    this.Personnage.arme_type_id = this.selectArmeType;
    this.Personnage.element_id = this.selectElement;

    this.http.post<any>('http://localhost/API_REST/index.php?section=Personnage&action=maj', this.Personnage, httpOptions).subscribe(
      jsonData => {
        this.refreach();
        this.ngOnInit();
      }
    );
  }

  public deletePersonnage() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<any>('http://localhost/API_REST/index.php?section=Personnage&action=del', this.Personnage, httpOptions).subscribe(
      jsonData => {
        this.tabPersonnage.splice(this.tabPersonnage.indexOf(this.Personnage));
        this.refreach();
      }
    );
  }

  public getArmeType() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.get<ArmeType[]>('http://127.0.0.1:8000/api/arme_types', httpOptions).subscribe(
      jsonData => {
        if (jsonData) {
          this.tabArmeType = jsonData;
        }
      }
    );
  }

  public getElement() {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.get<Element[]>('http://127.0.0.1:8000/api/elements', httpOptions).subscribe(
      jsonData => {
        if (jsonData) {
          this.tabElement = jsonData;
        }
      }
    );
  }

  _compareFn(a,b) {
    let result = false;
    if(a && b){
      if(a == b){
        result = true;
      }
    }
    return result;
  }


}
