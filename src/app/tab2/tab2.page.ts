import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  post;


  constructor(
    private router: Router,db: AngularFireDatabase
    ) {
      this.itemsRef = db.list('blog');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ionViewDidEnter(){
   }
 


   onDeletePost(postId){
    this.itemsRef.remove(postId);
 
   }


  openCreateBlogPage(){
    this.router.navigate(['tabs','tabs', 'tab2','create-blog']);
  }

}
