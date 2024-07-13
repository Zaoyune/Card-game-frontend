import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Carte} from "../model/Carte";
import {Observable} from "rxjs";
import {CarteAleatoire} from "../model/CarteAleatoire";
import {Hand} from "../model/Hand";
import {CarteDataState} from "../state/carte.state";

@Injectable({
  providedIn: 'root'
})
export class CarteServiceService {
  private baseUrl = 'http://localhost:8080/cartes';
  constructor(private http:HttpClient) { }

  GenererOrdreAleatoire(){
    return this.http.get<CarteAleatoire>(this.baseUrl + '/ordreAleatoire');
  }
  tirerMain(){
    return this.http.get<Carte[]>(this.baseUrl + '/tirerMain');
  }

  trierMain(main: Hand): Observable<Carte[]> {
    const url = `${this.baseUrl}/trierMain`;

    return this.http.post<Carte[]>(url, main);
  }

}
