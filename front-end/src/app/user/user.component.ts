import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  url = 'http://localhost:8888/notas';


  data = {};


  constructor(private router: Router, private http: HttpClient,private activatedRoute: ActivatedRoute) { }

  colorCard(data){
    if (data.gq2 == "--" && data.gq1 != "--") {
      if ((parseFloat(data.gq1) * 2) < 5) {
          return "bg-danger";
      } else if(parseFloat(data.gq1) < 7){
          return "bg-danger";
        }else{
          return "bg-primary";
      }
    } else if(data.gq1 != "--" && data.gq2 != "--"){
      let media = ((parseFloat(data.gq1) * 2) + (parseFloat(data.gq2) * 3)) / 5;
      if (media < 3) {
          return "bg-dark";
      } else
      if (media < 7) {
          return "bg-danger";
      } else {
          return "bg-success";
      }
    }else if(data.gq1 == "--" && data.gq2 == "--"){
      return "bg-primary";
    }
  }

  mensgCard(data){
    let returnNotas;
    if (data.gq2.replace(" ","") == "--" && data.gq1.replace(" ","") != "--") {
      if ((parseFloat(data.gq1) * 2) < 5) {
          var ppassar = (15 - (parseFloat(data.gq1) * 2)) / 3;
          returnNotas = "Nota para ir pra final (2GQ) - " + ppassar.toFixed(2);
      } else {
          ppassar = (35 - (parseFloat(data.gq1) * 2)) / 3;
          returnNotas = "Nota para passar direto (2GQ) - " + ppassar.toFixed(2);
      }
    } else if(data.gq1.replace(" ","") != "--" && data.gq2.replace(" ","") != "--"){
      let media = ((parseFloat(data.gq1) * 2) + (parseFloat(data.gq2) * 3)) / 5;
      if (media < 3) {
          returnNotas = "Você Reprovou :("
      } else
      if (media < 7) {
          let ppassar = 10 - media;
          returnNotas = "Nota para passar (Final) - " + ppassar.toFixed(2);
      } else {
          returnNotas = "Parabéns você passou com nota (Média) - " + media.toFixed(2);
      }
    }else if(data.gq1.replace(" ","") == "--" && data.gq2.replace(" ","") == "--"){
      returnNotas = "Sem notas publicadas";
    }
    return returnNotas;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const matricula = params['0'];
      const digito = params['1'];
      const senha = params['2'];

      let config = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };

      this.http.post(this.url,`matricula=${matricula}&digito=${digito}&senha=${senha}`,config).subscribe(
        (response) => {
            if(response.status == 0){
              console.log(response);
              this.data = response;
            }else{
              console.log("Erro");
            }
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

}

