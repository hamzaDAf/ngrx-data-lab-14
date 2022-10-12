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
import { Hero, MasterDetailCommands } from '../../core';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnChanges {
  @Input() hero!: Hero;
  @Input() commands!: MasterDetailCommands<Hero>;

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
    if (this.hero && this.hero.id) {
      this.form.patchValue(this.hero);
      this.addMode = false;
    } else {
      this.form.reset();
      this.addMode = true;
    }
  }

  // addHero(form: FormGroup) {
  //   const { value, valid, touched } = form;
  //   if (touched && valid) {
  //     this.add.emit({ ...this.hero, ...value });
  //   }
  //   this.close();
  // }

  close() {
    this.commands.close();
  }

  saveHero() {
    const { dirty, valid, value } = this.form;
    if (dirty && valid) {
      const newHero = { ...this.hero, ...value } as Hero;
      this.addMode ? this.commands.add(newHero) : this.commands.update(newHero);
    }
    this.close();
  }

  setFocus() {
    this.nameElement.nativeElement.focus();
  }

  // updateHero(form: FormGroup) {
  //   const { value, valid, touched } = form;
  //   if (touched && valid) {
  //     this.update.emit({ ...this.hero, ...value });
  //   }
  //   this.close();
  // }
}
