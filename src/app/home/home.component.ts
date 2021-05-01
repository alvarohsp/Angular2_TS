import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './../service/produto.service';
import { Produto } from './../objetos/Produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  prod: any
  produtos: Array <Produto> = []
  carregarLoading: boolean = false
  produtoNomeDel: string = ''

  constructor(
    private produtoService: ProdutoService,
    private route: Router
    ) { }

  ngOnInit(): void {

    this.produtoService.listar().subscribe(prods => {
      
      setTimeout(() => {
        this.produtos = prods
        this.carregarLoading = true
      },350)

    })       
  }

  excluirItem = (id: any) => {
    
    if (confirm(`Tem certeza que deseja deletar o produto ?`)){
      this.produtoService.excluirItem(id).subscribe(
        success => this.ngOnInit(),
        error => console.log("Erro"),
        () => console.log('Requisição completa')
      )
    }  
  }

  editarItem = (id: any) => {
    this.route.navigate([`cadastro/${id}`])
  }

}