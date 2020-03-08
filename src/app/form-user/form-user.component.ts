import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../user';
import { UserService } from '../user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})

export class FormUserComponent implements OnInit {
  form: FormGroup;
  user: User = {
    user_fullname: '',
    user_email: '',
    user_address: ''
  };
  userId: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');

      if (!this.userId) {
        return;
      }

      this.userService.getUser(this.userId)
        .subscribe(user => (this.user = user));
    });

    this.form = this.formBuilder.group({
      fullname: [this.user.user_fullname, Validators.required],
      email: [this.user.user_email, [Validators.required, Validators.email]],
      address: [this.user.user_address, Validators.required]
    })
  }

  onFormSubmit() {
    const detail = this.userId ? {method: 'updateUser', text: 'updated'} : {method: 'storeUser', text: 'saved'};

    this.userService[detail.method](this.user as User)
      .subscribe(() => {
        this._snackBar.open(`User successfully ${detail.text}`, 'Okay',{
          duration: 3000
        })

        this.router.navigate(['/']);
      });
  }

  matcher = new MyErrorStateMatcher();
}
