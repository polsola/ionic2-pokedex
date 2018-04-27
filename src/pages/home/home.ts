import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

import { PokemonData } from "../../providers/pokemon-data";
import { PokemonDetailPage } from "../pokemon-detail/pokemon-detail";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [PokemonData]
})
export class HomePage {
  pokemons = new Array();
  offset = 0;

  constructor(
    public navCtrl: NavController,
    public http: Http,
    public pokemonData: PokemonData
  ) {
    this.loadPokedex();
    console.log("hello");
    /*this.http.get('http://pokeapi.co/api/v2/pokemon').map(res => res.json()).subscribe(data => {
			console.log(data);
		    this.pokemons = data.results;
		});*/
  }

  loadPokedex() {
    this.pokemonData.load(this.offset).then(data => {
      this.pokemons = this.pokemons.concat(data);
      this.offset = this.pokemons.length;
    });
  }

  viewPokemon(pokemon: any) {
    this.navCtrl.push(PokemonDetailPage, {
      pokemon: pokemon
    });
  }

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");
    this.pokemonData.load(this.offset).then(data => {
      this.pokemons = this.pokemons.concat(data);
      this.offset = this.pokemons.length;
      infiniteScroll.complete();
    });
  }
}
