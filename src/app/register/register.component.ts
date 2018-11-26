import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {AdminService} from '../main/services/admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnableAccountService} from '../main/services/enable-account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  method = 'BILL';
  registerForm: FormGroup;
  detailsForm: FormGroup;
  checkbox = false;
  bill: any;
  clicked = false;
  contrat: any;
  reponse: any;
  ref: any;
  serv: any;
  user: any;
  client: any;
  questions: any;
  passCheck = true;
  toStep3 = true;
  buttonCheck = false;

  constructor(
    private adminService: AdminService,
    private enableAccountService: EnableAccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      facture: [''],
      service: [''],
      contrat: [''],
      reference: [''],
      firstname: [''],
      lastname: [''],
      questions: [''],
      answer: [''],
      firstname2: [''],
      lastname2: [''],
      email: [''],
      phone: [''],
      username: [''],
      password: [''],
      password2: [''],
    });
    this.detailsForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
      username: ['']
    });
  }

  get facture() {
    return this.registerForm.get('facture');
  }

  get service() {
    return this.registerForm.get('service');
  }

  get contract() {
    return this.registerForm.get('contract');
  }

  get reference() {
    return this.registerForm.get('reference');
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get answer() {
    return this.registerForm.get('facture');
  }

  get firstname2() {
    return this.registerForm.get('firstname2');
  }

  get lastname2() {
    return this.registerForm.get('lastname2');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password2() {
    return this.registerForm.get('password2');
  }

  ngOnInit() {
  }

  goToStep2() {
    if (this.method === 'BILL') {
      this.bill = this.registerForm.controls.facture.value;
      this.adminService.getUserWithBill(this.bill).subscribe(response => {
        this.user = response;
        if (this.user.count === 0) {
          return false;
        }
        console.log(this.user);
        this.registerForm.controls.firstname.setValue(this.user[0].lastName);
        this.registerForm.controls.lastname.setValue(this.user[0].firstName);
        return true;
      });
    } else if (this.method === 'CONTR') {
      this.serv = this.registerForm.controls.service.value;
      this.contrat = this.registerForm.controls.contrat.value;
      this.adminService.getUserWithContract(this.contrat).subscribe(response => {
        this.user = response;
        this.registerForm.controls.firstname.setValue(this.user[0].lastName);
        this.registerForm.controls.lastname.setValue(this.user[0].firstName);
      })
    } else if (this.method === 'REF') {
      this.ref = this.registerForm.controls.reference.value;
      this.adminService.getUserWithRef(this.ref).subscribe(response => {
        this.user = response;
        this.registerForm.controls.firstname.setValue(this.user[0].lastName);
        this.registerForm.controls.lastname.setValue(this.user[0].firstName);
      })
    }
    this.adminService.getQuestions().subscribe(response => {
      this.questions = response;
    })
  }

  goToStep3() {
    this.registerForm.controls.firstname2.setValue(this.user[0].firstName);
    this.registerForm.controls.lastname2.setValue(this.user[0].lastName);
    this.registerForm.controls.email.setValue(this.user[0].email);
  }

  goToStep4() {
    this.client = {
      lastname: this.user[0].lastName,
      firstname: this.user[0].firstName,
      email: this.registerForm.controls.email.value,
      username: this.registerForm.controls.username.value,
      phone: this.registerForm.controls.phone.value,
      password: this.registerForm.controls.password.value,
    }
    this.detailsForm.controls.firstname.setValue(this.client.firstname);
    this.detailsForm.controls.lastname.setValue(this.client.lastname);
    this.detailsForm.controls.email.setValue(this.client.email);
    this.detailsForm.controls.phone.setValue(this.client.phone);
    this.detailsForm.controls.username.setValue(this.client.username);
  }

  addUser() {
    this.adminService.saveUser(this.client).subscribe(response => {
      console.log(response);
      this.enableAccountService.sendToken(this.client.email).subscribe(response => {
        this.router.navigate(['/register-succes']);
      })
    })
  }

  checkPassword() {
    this.passCheck = (this.registerForm.controls.password.value === this.registerForm.controls.password2.value);
    this.buttonCheck = this.passCheck;
  }

  Verification() {
    this.adminService.getAnswer(this.registerForm.controls.questions.value).subscribe(response => {
      this.reponse = response;
      if (this.reponse[0].answer === this.registerForm.controls.answer.value) {
        this.toStep3 = false;
      } else {
        this.toStep3 = true;
      }
    })
    this.clicked = false;
  }

  setBill() {
    this.method = 'BILL';
  }

  setContr() {
    this.method = 'CONTR';
  }

  setRef() {
    this.method = 'REF';
  }

  setCheckbox() {
    this.checkbox = !this.checkbox;
  }

}
