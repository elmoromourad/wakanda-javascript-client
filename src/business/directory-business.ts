import AbstractBusiness from './abstract-business';
import DirectoryService from '../data-access/service/directory-service';
import Const from '../const';

export interface CurrentUserDBO {
  userName: string;
  fullName: string;
  ID: string|number;
}

class DirectoryBusiness extends AbstractBusiness {
  
  private service: DirectoryService;
  
  constructor({wakJSC}) {
    super({wakJSC});

    this.service = new DirectoryService({wakJSC});
  }

  login(username: string, password: string, duration?: number): Promise<boolean> {

    let durationTime = duration || Const.DEFAULT_SESSION_DURATION;

    if (!(typeof durationTime === 'number') || durationTime <= 0) {
      throw new Error('Directory.login: invalid duration parameter');
    }

    return this.service.login(username, password, durationTime)
      .catch(() => {
        return Promise.reject(new Error('Directory.login: Unauthorized'));
      });
  }

  logout(): Promise<boolean> {
    return this.service.logout()
      .catch(() => {
        return Promise.reject(new Error('Directory.logout: logout failed'));
      });
  }

  currentUser(): Promise<CurrentUserDBO> {
    return this.service.currentUser()
      .then(dbo => {
        return dbo;
      })
      .catch(() => {
        return Promise.reject(new Error('Directory.currentUser: user is not logged in'))
      });
  }

  currentUserBelongsTo(group: string): Promise<boolean> {

    if (!(typeof group === 'string')) {
      throw new Error('Directory.currentUserBelongsTo: group must be a string');
    }

    return this.service.currentUserBelongsTo(group)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}

export default DirectoryBusiness;
