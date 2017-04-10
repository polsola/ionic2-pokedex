import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';

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
    private toastCtrl: ToastController
    ) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

  	this.pokemon_index = navParams.get('pokemon');
    console.log(this.pokemon);
  	this.pokemonData.single(this.pokemon_index)
  		.then(data => {
  			this.pokemon = data;
        console.log(this.pokemon);
        this.loaded = true;
        loading.dismiss();
  		});
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'The pokemon was added to your team',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PokemonDetail');
  }

}
