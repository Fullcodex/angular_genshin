import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Personnage } from '../class/personnage/personnage';

@Component({
  selector: 'app-personnage',
  templateUrl: './personnage.component.html',
  styleUrls: ['./personnage.component.css']
})
export class PersonnageComponent implements OnInit {

  displayedColumns: string[] = ['id', 'op_nom', 'int_nom', 'libelle', 'statut', 'dt_debut', 'dt_fin', 'prc_execution'];
  dataSource: MatTableDataSource<Personnage>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tabPersonnage: Array<Personnage>;
  // tabOperations: Array<Operations>;
  // tabIntervenants: Array<Intervenants>;
  Personnage: Personnage;
  inputId: number;
  inputLibelle : string;
  inputStatut : string;
  inputDtDeb : Date;
  inputDtFin : Date;
  inputPcrExe :number;
  selectOp: number = null;
  selectInt: number = null;
  radioButton: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.tabPersonnage = Array<Personnage>();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    this.http.get<any>('http://127.0.0.1:8000/api/personnages',httpOptions).subscribe(
      jsonData => {
        if (jsonData) {
          console.log(jsonData);
          // for (const unPersonnage of jsonData) {
          //   this.Personnage = new Personnage();
          //   // this.Personnage.id = unPersonnage.id;
          //   // this.Personnage.op_nom = unPersonnage.op_nom;
          //   // this.Personnage.int_nom = unPersonnage.int_nom;
          //   this.tabPersonnage.push(this.Personnage);
          //   this.dataSource = new MatTableDataSource(this.tabPersonnage);
          //   this.refreach();
          //   this.radioButton = false;
          // }
        }
      }
    );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.tabPersonnage);
    this.radioButton = false;
    // this.getAllOperation();
    // this.getAllIntervenant();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.paginator._intl.itemsPerPageLabel = 'Nombre de ligne par page:';
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
    this.inputLibelle = null;
    this.inputStatut = null;
    this.inputDtDeb = null;
    this.inputDtFin = null;
    this.inputPcrExe = null;
    this.selectOp = null;
    this.selectInt = null;
    this.Personnage = null;
    this.radioButton = false;
    this.ngAfterViewInit();
  }

  public selectPersonnage(unPersonnage: Personnage) {
    this.Personnage = unPersonnage;
    // this.inputId = unPersonnage.id;
    // this.inputLibelle = unPersonnage.libelle;
    // this.inputStatut = unPersonnage.statut;
    // this.inputDtDeb = unPersonnage.dt_debut;
    // this.inputDtFin = unPersonnage.dt_fin;
    // this.inputPcrExe = unPersonnage.prc_execution;
    // this.selectOp =  unPersonnage.ref_operation;
    // this.selectInt = unPersonnage.ref_intervenant;
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

    // this.Personnage.libelle = this.inputLibelle;
    // this.Personnage.statut = this.inputStatut;
    // this.Personnage.dt_debut = this.inputDtDeb;
    // this.Personnage.dt_fin = this.inputDtFin;
    // this.Personnage.prc_execution = this.inputPcrExe;
    // this.Personnage.ref_operation = this.selectOp;
    // this.Personnage.ref_intervenant = this.selectInt;

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

  // public getAllOperation() {
  //   this.http.post<Operations[]>('http://localhost/API_REST/index.php?section=operations&action=getAll', null).subscribe(
  //     jsonData => {
  //       if (jsonData) {
  //         this.tabOperations = jsonData;
  //       }
  //     }
  //   );
  // }

  // public getAllIntervenant() {
  //   this.http.post<Intervenants[]>('http://localhost/API_REST/index.php?section=intervenants&action=getAll', null).subscribe(
  //     jsonData => {
  //       if (jsonData) {
  //         this.tabIntervenants = jsonData;
  //       }
  //     }
  //   );
  // }

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
