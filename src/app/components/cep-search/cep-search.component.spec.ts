import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { CepSearchComponent } from './cep-search.component';
import { CepService } from '../../services/cep.service';

describe('CepSearchComponent', () => {
  let component: CepSearchComponent;
  let fixture: ComponentFixture<CepSearchComponent>;
  let cepService: CepService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CepSearchComponent, FormsModule, HttpClientModule], 
      providers: [CepService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CepSearchComponent);
    component = fixture.componentInstance;
    cepService = TestBed.inject(CepService);
    fixture.detectChanges();
  });

  const dummyCepResponse = {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch address on search', () => {
    spyOn(cepService, 'getCepData').and.returnValue(of(dummyCepResponse));

    component.cep = '15990253';
    component.onSearch();

    expect(component.address).toEqual(dummyCepResponse);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle error on search', () => {
    spyOn(cepService, 'getCepData').and.returnValue(throwError(()=>'CEP não encontrado!'));

    component.cep = '15990253';
    component.onSearch();

    expect(component.address).toBeNull();
    expect(component.errorMessage).toBe('CEP não encontrado!');
  });

  it('should update search history on successful search', () => {
    spyOn(cepService, 'getCepData').and.returnValue(of(dummyCepResponse));

    component.cep = '15990253';
    component.onSearch();

    expect(component.searchHistory).toContain('15990253');
  });

  it('should not duplicate entries in search history', () => {
    spyOn(cepService, 'getCepData').and.returnValue(of(dummyCepResponse));

    component.cep = '15990253';
    component.onSearch();
    component.onSearch();

    expect(component.searchHistory.length).toBe(1);
    expect(component.searchHistory).toContain('15990253');
  });

  /*
    toBe() versus toEqual(): 
    toEqual() checks equivalence. toBe(), on the other hand, makes sure that they're the EXACT SAME object.
  */
  it('primite values comparison - test success', () => {
    const dummy = 'response';
    spyOn(cepService, 'anyMethod').and.returnValue(dummy);

    let result = component.returnFromService();
    expect(result).toBe(dummy);
    expect(result).toEqual(dummy);

    //altough there's a spy on the service method, the result is returned by the component method instead
    //since it's a primitive, toBe / toEqual will both pass
    let result2 = component.returnFromComponent();
    expect(result2).toBe(dummy);
    expect(result2).toEqual(dummy);
  });

  it('complex type comparison - different memory allocation toBe() WILL NOT pass', () => {
    spyOn(cepService, 'anyMethod2').and.returnValue(dummyCepResponse);

    let result = component.returnFromComponent2();
    expect(result).toBe(dummyCepResponse);
  });

  it('complex type comparison - same memory allocation toBe() WILL pass', () => {
    spyOn(cepService, 'anyMethod2').and.returnValue(dummyCepResponse);

    let result = component.returnFromService2();
    expect(result).toBe(dummyCepResponse);
  });

  it('complex type comparison - different memory allocation toEqual() will PASS', () => {
    spyOn(cepService, 'anyMethod2').and.returnValue(dummyCepResponse);

    let result = component.returnFromComponent2();
    expect(result).toEqual(dummyCepResponse);
  });
  
  it('complex type comparison - same memory allocation toEqual will also PASS', () => {
    spyOn(cepService, 'anyMethod2').and.returnValue(dummyCepResponse);

    let result = component.returnFromService2();
    expect(result).toEqual(dummyCepResponse);
  });

});
