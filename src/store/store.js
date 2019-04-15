import { observable } from 'mobx';

class Store {
   @observable
   version = 'onest';

   @observable
   user = {
      displayName: 'Anonymous',
      authenticated: false,
      avatar: null
   };
}

export default new Store();
