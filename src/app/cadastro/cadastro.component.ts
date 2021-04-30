import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DiasDaSemana } from './../dias-da-semana.enum';
import { Produto } from './../objetos/Produto';
import { ProdutoService } from './../service/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  id: any
  produto: Produto = new Produto(0, '', 0)
  textoBotaoCadastro: string = 'Cadastrar'


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private prodService: ProdutoService
  ) { }

  ngOnInit(): void {
  

    this.activatedRoute.params.subscribe(parametros => {
      if (parametros['id']){
        this.id = parametros['id']
        this.textoBotaoCadastro = "Editar"
        this.prodService.listarItem(this.id).subscribe(prod => {
          this.produto = prod
        })

        
        
        console.log(this.id)
      }
    })

  }

    adicionar = () => {

      if (this.textoBotaoCadastro == 'Cadastrar'){
        this.prodService.adicionarItem(this.produto).subscribe(
          success => this.navegar('home'),
          error => console.log("Erro"),
          () => console.log('Requisição completa'))

      }else{
        this.editar()
      }
    
    }

    editar = () => {
      this.prodService.editar(this.produto).subscribe(
        success => this.navegar('home'),
        error => console.log("Erro"),
        () => console.log('Requisição completa'))

    }

    navegar = (rota: any) => {
      this.router.navigate([rota])

    }
 

}
