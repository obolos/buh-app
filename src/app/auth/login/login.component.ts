import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { IUser } from '../../model-user/user';
import { Message } from '../../model-user/message';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UserService, 
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams
    .subscribe((params: Params) => {
      if(params['nowCanLogin']) {
        this.showMessage({type: 'success', text: 'Now you can enter to the System'});
      } else if (params['accessDenied']) {
        this.showMessage({
          text: 'For work with system you must enter',
          type: 'warning'
        });
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });


  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
    .subscribe((user: IUser) => {
      if (user) {
        if (user.password === formData.password) {
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          this.router.navigate(['/system', 'bill']);
        } else {
          this.showMessage({type: 'danger', text: 'Wrong password Dude (ㆆ _ ㆆ)'});
        }
        
      } else {
        this.showMessage({type: 'warning', text: 'There is no users here (_._)'});
      }
    });
  }

  private showMessage(message: Message) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = '';            
    }, 5000);
  }
  
}
