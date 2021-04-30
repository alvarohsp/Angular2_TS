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

  constructor(
    private produtoService: ProdutoService,
    private route: Router
    ) { }

  ngOnInit(): void {

    this.produtoService.listar().subscribe(prods => {
      
      setTimeout(() => {
        this.produtos = prods
        this.carregarLoading = true
      },300)

    })       
  }

  excluirItem = (id: any) => {
    
    this.produtoService.excluirItem(id).subscribe(
      success => console.log("Deletou"),
      error => console.log("Erro"),
      () => console.log('Requisição completa')
    )
    this.ngOnInit()
  }

  editarItem = (id: any) => {
    this.route.navigate([`cadastro/${id}`])
  }

}