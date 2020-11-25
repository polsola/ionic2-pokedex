import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
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
    public pokemonData: PokemonData,
    public loadingCtrl: LoadingController //
  ) {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loading.present();
    this.pokemonData.load(this.offset).then(data => {
      console.log('meh');
      this.pokemons = this.pokemons.concat(data);
      this.offset = this.pokemons.length;
      loading.dismiss();
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
