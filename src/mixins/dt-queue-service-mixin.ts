import Vue from 'vue';
import { Inject, Component } from 'vue-property-decorator';
import { DTQueueService } from '../dt-queue-service';

@Component
export class DTQueueServiceMixin extends Vue {
  public loading: boolean = false;

  @Inject({ default: () => new DTQueueService() })
  public queueService!: DTQueueService;

  public created() {
    this.loading = this.queueService.isBusy;
    this.queueService.$on('isBusy', (isBusy: boolean) => {
      this.loading = isBusy;
    });
  }

  public runWithQueueService(func: () => void) {
    if (!func) { return; }
    const qs = this.queueService.add();
    try {
      func();
    } finally {
      this.queueService.remove(qs);
    }
  }

  public async runWithQueueServiceAsync(func: () => Promise<any>) {
    if (!func) { return; }
    const qs = this.queueService.add();
    try {
      await func();
    } finally {
      this.queueService.remove(qs);
    }
  }

  public withQueueService<T>(promise: Promise<T>): Promise<T> {
    const qs = this.queueService.add();
    promise.finally(() => this.queueService.remove(qs));
    return promise;
  }
}
