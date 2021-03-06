import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PokemonData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PokemonData {

	data: any;

	pokemon: any;

	constructor(public http: Http) {
		console.log('Hello PokemonData Provider');
	}

	load(offset) {

		/*if (this.data) {
			// already loaded data
			return Promise.resolve(this.data);
		}*/

		console.log('prova');

		// don't have the data yet
		var requestUrl = window.location.origin + '/v2/pokemon/?offset=' + offset;
		console.log(requestUrl);
		return new Promise(resolve => {
			// We're using Angular HTTP provider to request the data,
			// then on the response, it'll map the JSON data to a parsed JS object.
			// Next, we process the data and resolve the promise with the new data.
			this.http.get(requestUrl)
				.map(res => res.json())
				.subscribe(data => {
					//debugger;
					console.log('Hello');
					// we've got back the raw data, now generate the core schedule data
					// and save the data for later reference
					this.data = data.results;
					resolve(this.data);
				});
		});
	}

	single(index) {

	  /*if (this.data) {
	    // already loaded data
	    return Promise.resolve(this.data);
	  }*/

		// don't have the data yet
		var requestUrl = window.location.origin + '/v2/pokemon/' + index + '/';
		console.log(requestUrl);
		return new Promise(resolve => {
			// We're using Angular HTTP provider to request the data,
			// then on the response, it'll map the JSON data to a parsed JS object.
			// Next, we process the data and resolve the promise with the new data.
			this.http.get(requestUrl)
				.map(res => res.json())
				.subscribe(data => {
					// we've got back the raw data, now generate the core schedule data
					// and save the data for later reference
					this.pokemon = data;
					resolve(this.pokemon);
				});
		});
	}

}
