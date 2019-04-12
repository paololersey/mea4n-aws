
import { Directive, TemplateRef } from '@angular/core';
import { DialogModalState } from './dialog-modal-state.service';
/**
 * Directive allowing to get a reference to the template containing the confirmation modal component,
 * and to store it into the internal confirm state service. Somewhere in the view, there must be
 *
 * ```
 * <template confirm>
 *   <confirm-modal-component></confirm-modal-component>
 * </template>
 * ```
 *
 * in order to register the confirm template to the internal confirm state
 */
@Directive({
    selector: "[confirm]"
  })
  export class DialogModalTemplateDirective {
    constructor(dialogModalTemplate: TemplateRef<any>, state: DialogModalState) {
      state.template = dialogModalTemplate;
    }
  }