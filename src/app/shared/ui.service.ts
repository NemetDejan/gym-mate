import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UiService {
  loadingStateChanged = new Subject<boolean>();

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
