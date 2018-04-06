import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, Button} from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';



@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit{
  quoteGroup: {category: string, quotes: Quote[], icon: string}

  constructor(private navParams: NavParams,
              private alertCtrl: AlertController,
              private quotesService: QuotesService) {}

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }
  
  // или др. вариант ниже с добавлением "?" в template {{ quoteGroup?.category | uppercase }}
 /* ionViewDidLoad() {
    this.quoteGroup = this.navParams.data;
  } */

  onAddToFavorite(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add the quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',         
          handler: () => {
            this.quotesService.addQuoteToFavorites(selectedQuote);
          }          
        },
        {
          text: 'No, I changed my thought',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled!');
          }
          /* "role" - позволяет выйти из алерта, дотронувшись до эрана за пределами пятна алерта и
          выполняет действие кнопки а которой вставлен, в даном случае 'cancel'*/
        }        
      ]
    });

    alert.present();
  }

  }


