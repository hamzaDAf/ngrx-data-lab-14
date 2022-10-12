import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../core/modal/modal.component';
import { Villain, MasterDetailCommands } from '../../core';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VillainListComponent {
  @Input() villains!: Villain[];
  @Input() selectedVillain!: Villain | null;
  @Input() commands!: MasterDetailCommands<Villain>;

  byId(index : number, villain: Villain) {
    return villain.id;
  }

  // select(villain: Villain) {
  //   this.selected.emit(villain);
  // }

  onSelect(villain: Villain) {
    this.commands.select(villain);
  }

  deleteVillain(villain: Villain) {
    this.commands.delete(villain);
  }

  // deleteVillain(villain: Villain) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '250px';
  //   dialogConfig.data = {
  //     title: 'Delete Villain',
  //     message: `Do you want to delete ${villain.name}`
  //   };

  //   const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(deleteIt => {
  //     console.log('The dialog was closed');
  //     if (deleteIt) {
  //       this.deleted.emit(villain);
  //     }
  //   });
  // }
}
