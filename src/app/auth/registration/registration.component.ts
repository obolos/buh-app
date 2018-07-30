import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { IUser } from '../../model-user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'name': new FormControl(null, [Validators.required]),
    'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new IUser(email, password, name);

    this.userService.createNewUser(user)
    .subscribe((user: IUser) => {
      this.router.navigate(['/auth/login'], {
        queryParams: {nowCanLogin: true}
      });
    });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
      .subscribe((user: IUser) => {
        if(user) {
          resolve({forbiddenEmail: true});
        } else {
          resolve(null);
        }
      });
    });
  }

}
