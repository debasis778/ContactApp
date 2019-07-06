import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   contData: Contact[];
   // contact = new Contact();
  constructor(private _contactService: ContactService) { }

  ngOnInit() {
    this._contactService.getContacts()
      .subscribe((data) => this.contData = data);
  }
  onsubmitAddContact(contact: Contact) {
    this._contactService.addContact(contact)
      .subscribe((newcontact) => {
        this.contData.push(newcontact);
        console.log('new contact added!');
      });
  }

}
