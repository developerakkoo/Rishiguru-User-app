import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.page.html',
  styleUrls: ['./create-blog.page.scss'],
})
export class CreateBlogPage implements OnInit {

  title;
  tag;
  content;
  imageURL;
  file: File;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  item: Observable<any[]>;
  itemRef: AngularFireList<any>;
  constructor(private router: Router, public db: AngularFireDatabase, private storage: AngularFireStorage ) {
   this.itemRef = db.list('blog/');
   this.item = this.itemRef.snapshotChanges().pipe(
    map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
   }

  ngOnInit() {
  }


  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `blog/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

  fileRef.getDownloadURL().subscribe((url) =>
  {
      console.log(url);
      this.imageURL = url;
      
    })
    
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe((url) => {
     
      
    })
  }




  updateItem(key: string, newText: string) {
    this.itemRef.update(key, { text: newText });
  }


  deleteItem(key: string) {
    this.itemRef.remove(key);
  }


  deleteEverything() {
    this.itemRef.remove();
  }



  uploadPost(){
   if(this.downloadURL){
    this.itemRef.push({
      title: this.title,
      tag: this.tag,
      content: this.content,
      imageUrl: this.imageURL, 
    }).then((post) => {
      if(post){
        console.log(post);
        this.router.navigate(['tabs', 'tabs', 'tab2']);
        
      }
    })
   }
  }
}
