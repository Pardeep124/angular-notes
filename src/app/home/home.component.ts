import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  url = 'https://basic-note.herokuapp.com/';
  posts = '';
  parentMessage: any[] = [];
  body: { name: string; title: string; description: string } = {
    name: '',
    title: '',
    description: '',
  };

  @ViewChild(ContactComponent) child: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.fetchPosts();
  }

  async fetchPosts() {
    await fetch(this.url)
      .then((response) => response.json()) // second step
      .then((data) => {
        this.parentMessage = data;
        this.body.description = '';
        console.log(data);
      })
      .catch((e) => console.log(e));
  }

  handleChange(event: any) {
    this.body = {
      name: 'Pardeep',
      title: 'Posts',
      description: event.target.value,
    };
  }

  async handleSubmit() {
    await fetch(this.url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.body),
    })
      .then((response) => console.log('Post Succesffuly'))
      .catch((e) => console.log(e));
    this.fetchPosts();
  }

  async handleDelete(id: string) {
    await fetch(this.url + id, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => console.log('Post deleted succesffuly'))
      .catch((e) => console.log(e));
    this.fetchPosts();
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
}
