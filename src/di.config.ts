import 'reflect-metadata';
import { Lifecycle, container } from 'tsyringe';
import { TestService } from './server/service/impl/test.service.impl';

const diContainer = container.createChildContainer();

/*diContainer.register('testService', TestService, {
  lifecycle: Lifecycle.Singleton,
});
*/

container.register('testService', { useFactory: () => new TestService() });

export { diContainer };
