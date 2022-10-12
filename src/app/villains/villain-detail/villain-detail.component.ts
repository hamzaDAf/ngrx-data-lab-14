import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MasterDetailCommands, Villain } from '../../core';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VillainDetailComponent implements OnChanges {
  @Input() villain!: Villain;
  @Input() commands!: MasterDetailCommands<Villain>;

  @ViewChild('name', { static: true }) nameElement!: ElementRef;

  addMode = false;

  // form = this.fb.group({
  //   id: [],
  //   name: ['', Validators.required],
  //   saying: ['']
  // });

  form = this.fb.group({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    saying: new FormControl('')
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    this.setFocus();
    if (this.villain && this.villain.id) {
      this.form.patchValue(this.villain);
      this.addMode = false;
    } else {
      this.form.reset();
      this.addMode = true;
    }
  }

  // addVillain(form: FormGroup) {
  //   const { value, valid, touched } = form;
  //   if (touched && valid) {
  //     this.add.emit({ ...this.villain, ...value });
  //   }
  //   this.close();
  // }

  close() {
    this.commands.close();
  }

  saveVillain() {
    const { dirty, valid, value } = this.form;
    if (dirty && valid) {
      const newVillain = { ...this.villain, ...value } as Villain;
      this.addMode
        ? this.commands.add(newVillain)
        : this.commands.update(newVillain);
    }
    this.close();
  }

  setFocus() {
    this.nameElement.nativeElement.focus();
  }

  // updateVillain(form: FormGroup) {
  //   const { value, valid, touched } = form;
  //   if (touched && valid) {
  //     this.update.emit({ ...this.villain, ...value });
  //   }
  //   this.close();
  // }
}
