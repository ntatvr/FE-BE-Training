import { Component, OnInit  } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

//import news entity
import { News } from '../../model/news';
import { NewsService } from '../../service/news.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

	news: News[] = [];

	fakeNews: News[] = [
		{
			id: 1,
			uri: 'www.google.com',
			title: 'Title 1',
			image: '',
			reader: '100',
			reply: '100',
			created_date: null,
			updated_date: null,
			is_active: 1
		},
		{
			id: 1,
			uri: 'www.google.com',
			title: 'Title 2',
			image: '',
			reader: '100',
			reply: '100',
			created_date: null,
			updated_date: null,
			is_active: 1
		}
	];

	async getNews() {
		const loading = await this.loadingController.create({
			message: 'Loading...'
		});
		await loading.present();
		await this.api.getNews()
		.subscribe(res => {
			if (res) {
				this.news = res['data'];
				//Array.prototype.push.apply(this.news, res['data']);
			}
			//console.log(this.news);
			loading.dismiss();
		}, err => {
			//console.log(err);
			loading.dismiss();
		});
	}

	// Add function for the new Angular 7 CDK Drag&Drop.
	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.news, event.previousIndex, event.currentIndex);
	}

	constructor(public api: NewsService,
		public loadingController: LoadingController,
		public router: Router,
		public route: ActivatedRoute) {}

	ngOnInit() {
		// this.getNews();
	}
}
