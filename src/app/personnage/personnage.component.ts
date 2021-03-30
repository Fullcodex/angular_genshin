import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArmeType } from '../class/arme_type/arme-type';
import { Personnage } from '../class/personnage/personnage';
import { Element } from '../class/element/element';

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
  inputNom: string;
  inputRarete: number;
  inputImage: string;
  selectArmeType: ArmeType;
  selectElement: Element;
  radioButton: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.tabPersonnage = Array<Personnage>();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.get<Personnage[]>('http://127.0.0.1:8000/api/personnages', httpOptions).subscribe(
      jsonData => {
        if (jsonData) {
          for (const unPersonnage of jsonData) {
            this.Personnage = unPersonnage;
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
    this.inputId = unPersonnage.personnageId;
    this.inputNom = unPersonnage.nom;
    this.inputRarete = unPersonnage.rarete;
    this.inputImage = unPersonnage.image;
    this.selectArmeType = unPersonnage.armeType;
    this.selectElement = unPersonnage.element;
  }

  public insertPersonnage() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // let tab = {
    //   nom: this.inputNom,
    //   rarete: Number(this.inputRarete),
    //   image: this.inputImage,
    //   armeType: {
    //     armeTypeId: this.selectArmeType.armeTypeId,
    //     labelType: this.selectArmeType.labelType
    //   },
    //   element: {
    //     elementId: this.selectElement.elementId,
    //     label: this.selectElement.label
    //   }
    // };

    let tab = {
      nom: this.inputNom,
      rarete: Number(this.inputRarete),
      image: this.inputImage,
      armeType: '/api/arme_types/' + this.selectArmeType.armeTypeId,
      element: '/api/elements/' + this.selectElement.elementId
    };

    this.http.post<Personnage>('http://127.0.0.1:8000/api/personnages', tab, httpOptions).subscribe(
      jsonData => {
        if (jsonData.personnageId) {
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

    let tab = {
      nom: this.inputNom,
      rarete: Number(this.inputRarete),
      image: this.inputImage,
      armeType: '/api/arme_types/' + this.selectArmeType.armeTypeId,
      element: '/api/elements/' + this.selectElement.elementId
    };

    this.http.put<Personnage>('http://127.0.0.1:8000/api/personnages/'+this.Personnage.personnageId, tab, httpOptions).subscribe(
      jsonData => {
        if(jsonData.personnageId){
          this.refreach();
          this.ngOnInit();
        }
      }
    );
  }

  public deletePersonnage() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log(this.Personnage);

    this.http.delete<Personnage>('http://127.0.0.1:8000/api/personnages/' + this.Personnage.personnageId, httpOptions).subscribe(
      jsonData => {
        if (jsonData == null) {
          this.refreach();
          this.ngOnInit();
        }
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

  _compareFn(a, b) {
    let result = false;
    if (a && b) {
      if (a == b) {
        result = true;
      }
    }
    return result;
  }

  _compareArmeType(a, b) {
    if (a && b) {
      return a.armeTypeId === b.armeTypeId;
    } else {
      return false;
    }
  }

  _compareElement(a, b) {
    if (a && b) {
      return a.elementId === b.elementId;
    } else {
      return false;
    }
  }


}
