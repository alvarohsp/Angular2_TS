export class Produto {
    
    constructor(public id: number, public nome: string, public marca: string, public preco: number, private desconto: number = 10){
    }

}