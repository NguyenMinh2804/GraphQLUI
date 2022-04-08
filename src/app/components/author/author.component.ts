import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authourFrom = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(private authorService: AuthorService) { }

  authors: any;
  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.loadAuthors()
      .valueChanges
      .subscribe(({ data }) => {
        this.authors = data.authors;
      });
  }

  onAddAuthor() {
    let id = this.authourFrom.value.id;
    let name = this.authourFrom.value.name;
    this.authorService.addAuthor(id, name).subscribe(({ data }) => {
      this.loadAuthors();
    }, (error) => {
      console.log(error);
    });
  }

  onRemoveAuthor(id: any) {
    console.log(id);
    this.authorService.removeAuthor(id).subscribe(({ data }) => {
      this.loadAuthors();
    }, (error) => {
      console.log(error);
    });
  }
}
