import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Hero, MasterDetailCommands } from '../../core';
import { ModalComponent } from '../../core/modal/modal.component';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent {
  @Input() heroes!: Hero[];
  @Input() selectedHero!: Hero | null;
  @Input() commands!: MasterDetailCommands<Hero>;


  byId(index: number, hero: Hero) {
    return hero.id;
  }

  // select(hero: Hero) {
  //   this.selected.emit(hero);
  // }

  onSelect(hero: Hero) {
    this.commands.select(hero);
  }

  deleteHero(hero: Hero) {
    this.commands.delete(hero);
  }

  // deleteHero(hero: Hero) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '250px';
  //   dialogConfig.data = {
  //     title: 'Delete Hero',
  //     message: `Do you want to delete ${hero.name}`
  //   };

  //   const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(deleteIt => {
  //     console.log('The dialog was closed');
  //     if (deleteIt) {
  //       this.deleted.emit(hero);
  //     }
  //   });
  // }
}
