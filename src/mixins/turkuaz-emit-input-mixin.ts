import Vue from 'vue';
import { Component, Emit } from 'vue-property-decorator';

@Component
export class TurkuazEmitInputMixin extends Vue {
  @Emit('input')
  public emitInput(val: any) {
    // boş
  }
}
