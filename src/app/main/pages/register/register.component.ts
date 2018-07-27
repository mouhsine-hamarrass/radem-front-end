import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  protected method = 'BILL';
  protected registerForm: FormGroup;
  protected detailsForm: FormGroup;
  protected checkbox = false;
  protected bill: any;
  protected clicked = false;
  protected contrat: any;
  protected reponse: any;
  protected ref: any;
  protected serv: any;
  protected user: any;
  protected client: any;
  protected questions: any;
  protected passCheck = true;
  protected toStep3 = true;
  protected buttonCheck = false;

  constructor(private adminService: AdminService,
    private formBuilder: FormBuilder) {
      this.registerForm = this.formBuilder.group({
        facture: [''],
        service: [''],
        contrat: [''],
        reference: [''],
        fullname: [''],
        questions: [''],
        answer: [''],
        fullname2: [''],
        email: [''],
        phone: [''],
        username: [''],
        password: [''],
        password2: [''],
      });
      this.detailsForm = this.formBuilder.group({
        fullname: [''],
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

  get fullname() {
    return this.registerForm.get('facture');
   }

  get answer() {
    return this.registerForm.get('facture');
  }

  get fullname2() {
    return this.registerForm.get('fullname2');
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
        this.registerForm.controls.fullname.setValue(this.user[0].fullName);
        console.log(this.user[0].fullName);
      });
    } else if (this.method === 'CONTR') {
      this.serv = this.registerForm.controls.service.value;
      this.contrat = this.registerForm.controls.contrat.value;
      this.adminService.getUserWithContract(this.contrat).subscribe(response => {
        this.user = response;
        this.registerForm.controls.fullname.setValue(this.user[0].fullName);
      })
    } else if (this.method === 'REF') {
      this.ref = this.registerForm.controls.reference.value;
      this.adminService.getUserWithRef(this.ref).subscribe(response => {
        this.user = response;
        this.registerForm.controls.fullname.setValue(this.user[0].fullName);
      })
    }
    this.adminService.getQuestions().subscribe(response => {
      this.questions = response;
    })
  }

  goToStep3() {
    this.registerForm.controls.fullname2.setValue(this.user[0].fullName);
    this.registerForm.controls.email.setValue(this.user[0].email);
  }

  goToStep4() {
    this.client = {
      fullname : this.user[0].fullName,
      email : this.user[0].email,
      username : this.registerForm.controls.username.value,
      phone : this.registerForm.controls.phone.value,
      password : this.registerForm.controls.password.value,
    }
    // TO DO service to save the user
    this.adminService.saveUser(this.client).subscribe(response => {
    })
    this.detailsForm.controls.fullname.setValue(this.client.fullname);
    this.detailsForm.controls.email.setValue(this.client.email);
    this.detailsForm.controls.phone.setValue(this.client.phone);
    this.detailsForm.controls.username.setValue(this.client.username);
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
