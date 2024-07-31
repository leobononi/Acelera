import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CepService } from '../../services/cep.service';

@Component({
  selector: 'app-cep-search',
  standalone: true,
  templateUrl: './cep-search.component.html',
  styleUrls: ['./cep-search.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CepSearchComponent {
  cep = '';
  address: any;
  errorMessage: string | null = null;
  searchHistory: string[] = [];

  constructor(private cepService: CepService) { }

  onSearch() {
    this.cepService.getCepData(this.cep).subscribe({
      next: (data) => {
        this.address = data;
        this.errorMessage = null;
        this.updateSearchHistory(this.cep);
      },
      error: () => {
        this.address = null;
        this.errorMessage = 'CEP não encontrado!';
      }
     });
  }

  updateSearchHistory(cep: string) {
    if (!this.searchHistory.includes(cep)) {
      this.searchHistory.push(cep);
    }
  }

  returnFromService(): string{
    return this.cepService.anyMethod();
  }

  returnFromComponent(): string{
    let result = this.cepService.anyMethod();
    return 'response';
  }

  returnFromService2() {
    let result2 = this.cepService.anyMethod2();
    return result2;
  }

  returnFromComponent2(){
    let result2 =  this.cepService.anyMethod2();
    return {
      cep: "15990-253",
      logradouro: "Avenida Yolanda Tomazelli Cecchetto",
      complemento: "",
      bairro: "Residencial Beniamino Cadioli",
      localidade: "Matão",
      uf: "SP",
      ibge: "3529302",
      gia: "4418",
      ddd: "16",
      siafi: "6687"
    };
  }
}
