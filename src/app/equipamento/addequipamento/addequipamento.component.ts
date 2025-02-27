import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CategoriasService } from 'src/app/service/categorias.service';
import { Observable, timer } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { MateriaisService } from 'src/app/service/materiais.service';
import { Material } from 'src/app/models/material';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addequipamento',
  templateUrl: './addequipamento.component.html',
  styleUrls: ['./addequipamento.component.scss'],
})
export class AddequipamentoComponent implements OnInit {



  equipamentoForm = this.fb.group({
    id: [undefined],
    descricao: ['', [Validators.required]],
    quantidade: ['', []],
    disponivel: ['', [Validators.required]],
    idCategoria: ['', []],
  });

  categorias$: Observable<Categoria[]>

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriasService,
    private materiaisService: MateriaisService,
    public alertController: AlertController,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.categorias$ = this.categoriaService.listarCategoria();


  }
  addMaterial() {
    if (this.equipamentoForm.value.idCategoria == null || this.equipamentoForm.value.idCategoria == '') {
      this.presentErroMaterialCadastrado();
    } else {
      this.categoriaService.buscarPorId(this.equipamentoForm.value.idCategoria, (nome: string) => {
        let categoria: Categoria={
          id: this.equipamentoForm.value.idCategoria,
          nome: nome,
        }
        let material: Material = {
          id: this.equipamentoForm.value.id,
          descricao: this.equipamentoForm.value.descricao,
          categoria: categoria,
          disponivel: this.equipamentoForm.value.disponivel,
          quantidade: this.equipamentoForm.value.disponivel,
          status: 'Disponível',
        }
        this.materiaisService.adicionarMaterial(material);
        this.equipamentoForm.reset();
      });
      this.router.navigate(['/equipamento']);
      this.presentMaterialCadastrado();
      
    }

  }

  async presentErrorCategoria() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: '<strong>Por favor selecione uma categoria!!</strong>',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentMaterialCadastrado() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Material cadastrado!!',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentErroMaterialCadastrado() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Erro ao cadastrar material!!',
      buttons: ['OK']
    });

    await alert.present();
  }

}
