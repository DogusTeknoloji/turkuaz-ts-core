import Vue from 'vue';

export class DTQueueService extends Vue {
  public isBusy: boolean = false;

  private sequence = 0;
  private queue: string[] = [];

  public add(): string {
    try {
      const id = String(this.sequence++);
      this.queue.push(id);
      return String(id);
    } finally {
      this.isBusy = !!this.queue.length;
      this.$emit('isBusy', this.isBusy);
    }
  }

  public remove(id: string) {
    try {
      this.queue.splice(this.queue.indexOf(id), 1);
    } finally {
      this.isBusy = !!this.queue.length;
      this.$emit('isBusy', this.isBusy);
    }
  }
}
