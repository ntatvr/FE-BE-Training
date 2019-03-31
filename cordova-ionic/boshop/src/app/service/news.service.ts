import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { News } from '../model/news';

const httpOptions = {
	headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
				'Accept': 'application/json'
			})
};
//const apiUrl = "https://ntatvr.herokuapp.com/crawler?limit=20&page=0";
const apiUrl = "http://localhost:8080/springmvc/crawler";

@Injectable({
	providedIn: 'root'
})
export class NewsService {

	news: News[] = [];

	constructor(private http: HttpClient) { }


	//This is error handler function.
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	getNews(): Observable<News> {
		return this.http.get<News>(apiUrl).pipe(
			tap(_ => console.log(`fetched all news`)),
			catchError(this.handleError<News>(`getNews`))
		);
	}

	// getNews() {
	// 	var self = this;
	// 	this.http.get(apiUrl).subscribe(res => {
	// 		res['data'].forEach(function(item, index) {
	// 			console.log(item);
	// 			let news = new News();
	// 			news.id = item.id;
	// 			news.uri = item.uri;
	// 			news.title = item.title;
	// 			news.image = item.image;
	// 			news.reader = item.reader;
	// 			news.reply = item.reply;
	// 			news.is_active = item.is_active;
	// 			self.news.push(news);
	// 		});
	// 	});
	// 	console.log('Get list of news from API');
	// 	return self.news;
	// }

// getProduct(id): Observable<Product> {
//   const url = `${apiUrl}/${id}`;
//   return this.http.get<Product>(url).pipe(
//     tap(_ => console.log(`fetched product id=${id}`)),
//     catchError(this.handleError<Product>(`getProduct id=${id}`))
//   );
// }

// addProduct (product): Observable<Product> {
//   return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
//     tap((product: Product) => console.log(`added product w/ id=${product._id}`)),
//     catchError(this.handleError<Product>('addProduct'))
//   );
// }

// updateProduct (id, product): Observable<any> {
//   const url = `${apiUrl}/${id}`;
//   return this.http.put(url, product, httpOptions).pipe(
//     tap(_ => console.log(`updated product id=${id}`)),
//     catchError(this.handleError<any>('updateProduct'))
//   );
// }

// deleteProduct (id): Observable<Product> {
//   const url = `${apiUrl}/${id}`;

//   return this.http.delete<Product>(url, httpOptions).pipe(
//     tap(_ => console.log(`deleted product id=${id}`)),
//     catchError(this.handleError<Product>('deleteProduct'))
//   );
// }
}
