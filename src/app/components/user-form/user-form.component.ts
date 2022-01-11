import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public userForm : FormGroup;
  public userList : Array<{}> = [];

  constructor(private fb: FormBuilder, public appService : AppService) { }

  ngOnInit(): void {
    this.createForm();
  }
 private createForm(){
   this.userForm = this.fb.group({
     email:[''],
     username:['']
   })
 }

 public formSubmit(){
   console.log(this.userForm.value);
   this.appService.addUsers(this.userForm.value);
 }



}
