import Vue from 'vue';
import { Component, Emit } from 'vue-property-decorator';

@Component
export class DTEmitInputMixin extends Vue {
  @Emit('input')
  public emitInput(val: any) {
    // boş
  }
}
