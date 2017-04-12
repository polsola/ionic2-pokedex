import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {PokemonData} from '../../providers/pokemon-data';

/**
 * Generated class for the PokemonDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-pokemon-detail',
  templateUrl: 'pokemon-detail.html',
  providers: [PokemonData]
})
export class PokemonDetailPage {

	pokemon_index : any;
	

  pokemon = {};

  loaded = false;
  


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController, 
    public pokemonData: PokemonData,
    private toastCtrl: ToastController,
    public storage: Storage
    ) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    //this.storage.remove('team');

  	this.pokemon_index = navParams.get('pokemon');
  	this.pokemonData.single(this.pokemon_index)
  		.then(data => {
  			this.pokemon = data;
        this.loaded = true;
        loading.dismiss();
  		});
  }

  addToTeam() {
    this.storage.get('team').then((team) => {
      console.log(team);
      if(team == null) {
        team = new Array();
        console.log('Empty!');
      }
      team.push({ index : this.pokemon_index, pokemon : this.pokemon });
      this.storage.set('team', team);
      console.log(team);
    });

    let toast = this.toastCtrl.create({
      message: 'The pokemon was added to your team',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PokemonDetail');
  }

}
