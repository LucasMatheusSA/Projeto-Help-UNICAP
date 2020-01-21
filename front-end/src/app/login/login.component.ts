import { Component, OnInit } from '@angular/core'
import {Router} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  url = 'http://localhost:8888/login';
  formData = new FormData();

  matricula = '';
  senha = '';

  mensg = '';
  flagMensg = false;



  login(){

    if(this.matricula.length != 10 || this.senha.length != 6 || !this.isNumber(this.matricula) || !this.isNumber(this.senha)){

      this.mensg = 'Matricula ou senha Incoretas !!!';
      this.flagMensg = true;

    }else{

      let config = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };

      this.http.post(this.url,`matricula=${this.matricula.substring(0 , this.matricula.length - 1)}&digito=${this.matricula.substring(this.matricula.length - 1 , this.matricula.length)}&senha=${this.senha}`,config).subscribe(
        (response) => {
          if(response.status == 0){
            this.router.navigate(['/user'],{queryParams:
              [this.matricula.substring(0 , this.matricula.length - 1),
              this.matricula.substring(this.matricula.length - 1 , this.matricula.length),
              this.senha]});
          }else if(response.status == 1){
            this.mensg = 'Erro na captura dos dados !!!';
            this.flagMensg = true;
          }else{
            this.mensg = 'Matricula ou senha invalidos !!!';
            this.flagMensg = true;
          }
        },
        (error) => {
          this.mensg = 'Erro ao enviar matricula ou senha !!!';
          this.flagMensg = true;
          console.log(error);
        }
      );

    }
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  ngOnInit() {
  }

}
