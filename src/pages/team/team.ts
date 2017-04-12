import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PokemonDetailPage } from '../pokemon-detail/pokemon-detail';

@Component({
  selector: 'page-team',
  templateUrl: 'team.html'
})
export class TeamPage {

	team: any;

	constructor(
		public navCtrl: NavController, 
		public http: Http,
		public storage: Storage
		) {

		

	}

	viewPokemon(pokemon: any ){
		this.navCtrl.push(PokemonDetailPage, {
			pokemon: pokemon
		});
	}

	removePokemon(index){
		this.team = this.team.filter(function( team_member ) {
		    return team_member.index !== index;
		});
		this.storage.set('team', this.team);

	}

	ionViewWillEnter() {
	    this.storage.get('team').then((team) => {
			console.log(team);
			console.log(team.length);
		  	this.team = team;
		});
	}

}
