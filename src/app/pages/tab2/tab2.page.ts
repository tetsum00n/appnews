/* eslint-disable @typescript-eslint/member-ordering */
import { NewsService } from 'src/app/services/news.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  page = 1;

  articles: Article[]=[];
  categories: string[]=['business','entertainment','general','health','science','sports','technology'];
  selectedCategory: string;
  constructor(private newsService: NewsService) {};
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  ngOnInit() {
    this.selectedCategory = this.categories[0];
    this.newsService.getTopHeadlines(this.page).subscribe(resp=>{
      console.log(resp);
      this.articles = resp.articles;
    });
  }

  segmentChanged(event: any){
    this.infiniteScroll.disabled = false;
    this.page=1;
    console.log(event.detail.value);
    this.selectedCategory = event.detail.value;
    this.newsService.getTopHeadlinesByCategories(this.page, this.selectedCategory).subscribe(resp=>{
      console.log(resp);
      this.articles = resp.articles;
    });
  }

  loadData(event: any){
    this.page +=1;
    console.log(event);
    this.newsService.getTopHeadlinesByCategories(this.page, this.selectedCategory).subscribe(resp=>{
      //console.log(resp);
      if(resp.articles.length===0){
        this.infiniteScroll.disabled= true;
      }
      this.articles = [...this.articles,...resp.articles];
      this.infiniteScroll.complete();
    });
  }

}
