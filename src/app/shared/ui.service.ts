import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UiService {

  constructor(
    private snackbar: MatSnackBar
  ) {
  }

  showSnackbar(message: string, action = null, duration: number = 2000) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
