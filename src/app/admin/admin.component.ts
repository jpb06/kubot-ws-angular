import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/api/admin.service';

import { FormBuilder, Validators } from '@angular/forms';
import { AlertType, AlertService } from 'src/services/alert.service';
import { validateCapitalizedStarSystems, StarSystem } from 'src/types/api/star.system';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss', './../../assets/styles/colors.scss', './../../assets/styles/form.validation.scss']
})
export class AdminComponent implements OnInit {

  public starSystemsForm = this.formBuilder.group({
    starSystems: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  async setStarSystems() {
    this.alertService.clear();
    if (
      this.starSystemsForm.valid
    ) {
      const rawData = this.starSystemsForm.get('starSystems').value;

      let data: any;
      try {
        data = JSON.parse(rawData); 
      } catch (err) {
        setTimeout(() => { // triggers the animation
          this.alertService.report('Invalid content, expecting json.', AlertType.Exception);
        });
      }

      let isInputValidated = validateCapitalizedStarSystems(data);
      if (isInputValidated) {
        try {


          let starSystems: Array<StarSystem> = [];
          (<Array<any>>data).forEach(el => starSystems.push({ name: el.Name, nickName: el.NickName, posX: el.PosX, posY: el.PosY }));

          await this.adminService.setStarSystems(starSystems);

          setTimeout(() => { // triggers the animation
            this.alertService.report('Configuration saved.', AlertType.Success);
          });

        } catch (err) {
          setTimeout(() => { // triggers the animation
            this.alertService.report('An error occured while saving star systems.', AlertType.Exception);
          });
        }
      } else {
        setTimeout(() => { // triggers the animation
          this.alertService.report('Invalid data. Expecting a list of star systems.', AlertType.Exception);
        });
      }
    }
  }
}
