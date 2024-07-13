import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CarteServiceService} from "./services/carte-service.service";
import {Carte} from "./model/Carte";
import {CarteAleatoire} from "./model/CarteAleatoire";
import {Hand} from "./model/Hand";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {CardStateEnum, CarteDataState} from "./state/carte.state";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Carte-Front';
  carteAleatoire$ : Observable<CarteDataState<CarteAleatoire>> |null=null;
  readonly CardStateEnum=CardStateEnum;
  cartes$ : Observable<CarteDataState<Carte[]>> |null=null;
  cartesTries$ : Observable<CarteDataState<Carte[]>> |null=null;
  TirerButton : boolean = false;
  TrierButton : boolean = false;
  animationInProgress = false;
  hand = new Hand();
  constructor(private carteService: CarteServiceService) {
  }
  ngOnInit(): void {

  }


  GenererOrdreAleatoire() {
    this.carteAleatoire$ = this.carteService.GenererOrdreAleatoire().pipe(
      map(data => {
        this.TirerButton = true;
        this.hand.carteAleatoire = data;
        return { dataState: CardStateEnum.LOADED, data };
      }),
      startWith({ dataState: CardStateEnum.LOADING } as CarteDataState<CarteAleatoire>),
      catchError(err => of({ dataState: CardStateEnum.ERROR, errorMessage: err.message } as CarteDataState<CarteAleatoire>))
    );
  }

  TirerMain() {
    this.cartes$ = this.carteService.tirerMain().pipe(
      map(data => {
        this.hand.cartes = data;
        this.TrierButton = true;
        return { dataState: CardStateEnum.LOADED, data };
      }),
      startWith({ dataState: CardStateEnum.LOADING } as CarteDataState<Carte[]>),
      catchError(err => of({ dataState: CardStateEnum.ERROR, errorMessage: err.message } as CarteDataState<Carte[]>))
    );
  }

  TrierMain() {
    this.cartesTries$ = this.carteService.trierMain(this.hand).pipe(
      map(data => {
        this.TrierButton = true;
        return { dataState: CardStateEnum.LOADED, data };
      }),
      startWith({ dataState: CardStateEnum.LOADING } as CarteDataState<Carte[]>),
      catchError(err => of({ dataState: CardStateEnum.ERROR, errorMessage: err.message } as CarteDataState<Carte[]>))
    );
  }

  getImageUrl(card: Carte): string {
    const imageName  = `${card.valeur}_of_${card.couleur.toLowerCase()}.png`;
    const imageUrl = `assets/${imageName}`;
    return imageUrl;
  }
  getValeurCouleurImageUrl(cardName: string): string {
    const imageUrl = `assets/ColorsValues/${cardName}.png`;
    return imageUrl;
  }


  toggleCardFlip(card:Carte) {
    card.flipped = !card.flipped;
  }


}
