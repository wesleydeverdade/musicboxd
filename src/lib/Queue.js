import Bee from 'bee-queue';
import * as Sentry from '@sentry/node';
import UserStoreMail from '../app/jobs/UserStoreMail';
import redisConfig from '../config/redis';
import sentryConfig from '../config/sentry';

const jobs = [UserStoreMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, { redis: redisConfig }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    // console.log(`Queue ${job.queue.name}: FAILED`, err);
    Sentry.init(sentryConfig);
    Sentry.captureException(err);
  }
}

export default new Queue();
