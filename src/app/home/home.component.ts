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
  id = '';

  parentMessage: any[] = [];
  body: { name: string; title: string; description: string } = {
    name: '',
    title: '',
    description: '',
  };

  @ViewChild(ContactComponent) child: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.fetchid();
  }

  async fetchid() {
    await fetch(this.url)
      .then((response) => response.json()) // second step
      .then((data) => {
        this.parentMessage = data;
        this.body.description = '';
      })
      .catch((e) => console.log(e));
  }

  handleChange(event: any) {
    this.body = {
      name: 'Pardeep',
      title: 'id',
      description: event.target.value,
    };
  }

  async handleSubmit() {
    if (!this.id) {
      console.log(this.id);
      await fetch(this.url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.body),
      })
        .then((response) => console.log('Note Posted Succesffuly'))
        .catch((e) => console.log(e));
    } else {
      console.log('Update');
      await fetch(this.url + this.id, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.body),
      })
        .then((response) => console.log('Note Updated Succesffuly'))
        .catch((e) => console.log(e));
      this.id = '';
    }
    this.fetchid();
  }

  async handleDelete(id: string) {
    await fetch(this.url + id, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => console.log('Note deleted succesffuly'))
      .catch((e) => console.log(e));
    this.fetchid();
  }

  async handleUpdate(post: any) {
    this.id = post._id;
    this.body.description = post.description;
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
}
