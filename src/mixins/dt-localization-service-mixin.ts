import Vue from 'vue';
import { Inject, Component } from 'vue-property-decorator';
import { DTLocalizationService } from '../dt-localization-service';

@Component
export class DTLocalizationServiceMixin extends Vue {
  @Inject({ default: () => new DTLocalizationService() })
  public localizationService!: DTLocalizationService;
}
