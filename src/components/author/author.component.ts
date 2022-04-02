import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormGroup, FormControl } from '@angular/forms';

const GET_AUTHORS = gql`
  query {
    authors {
      id
      name
    }
  }`;

const PUT_AUTHORS = gql`
  mutation($id: ID!, $name: String)
  {
    createAuthor(id: $id, name: $name) {
      id
      name
    }
  }`;

const DELETE_AUTHORS = gql`
  mutation($id: ID!)
  {
    deleteAuthor(id: $id)
  }`;
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

  constructor(private apollo: Apollo) { }

  authors: any;
  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    console.log(1);
    this.apollo.watchQuery<any>({
      query: GET_AUTHORS,
      fetchPolicy: 'network-only'
      })
      .valueChanges
      .subscribe(({ data }) => {
        console.log(data);
        this.authors = data.authors;
      });
  }
  addAuthor() {
    return this.apollo.mutate({
      mutation: PUT_AUTHORS,
      variables: {
        id: this.authourFrom.value.id,
        name: this.authourFrom.value.name,
      }
    });
  }
  onAddAuthor() {
    this.addAuthor().subscribe(({ data }) => {
      this.loadAuthors();
    }, (error) => {
      console.log(error);
    });
  }
  onRemoveAuthor(id: any)
  {
    console.log(id);
    this.apollo.mutate({
      mutation: DELETE_AUTHORS,
      variables: {
        id: id,
      }
    }).subscribe(({ data }) => {
      this.loadAuthors();
    }, (error) => {
      console.log(error);
    });
  }
}
