import Vue from 'vue';
import { Inject, Component } from 'vue-property-decorator';
import { TurkuazLocalizationService } from '../turkuaz-localization-service';

@Component
export class TurkuazLocalizationServiceMixin extends Vue {
  @Inject({ default: () => new TurkuazLocalizationService() })
  public localizationService!: TurkuazLocalizationService;
}
