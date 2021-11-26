interface IStorage {
  [key: string]: any;
}

export class LocalStorage {
  storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  /**
   * 存储
   * @param key 键名
   * @param value 键值
   * @param expired 过期时间，以分钟为单位（不传则永久有效）
   */
  set(key: string, value: string | object, expired?: number | undefined): void {
    let storage: IStorage = this.storage;

    storage[key] = JSON.stringify(value);
    // 设置过期时间为分钟
    if (expired != undefined)
      storage[`${key}__expires__`] = Date.now() + 1000 * 60 * expired;
  }

  /**
   * 获取值
   * @param key 键名
   * @returns 没过期返回数据，否则返回undefined
   */
  get(key: string) {
    const storage: IStorage = this.storage;
    const expires: number = storage[`${key}__expires__`];

    if (expires) {
      const now = Date.now();
      if (now >= expires) {
        this.remove(key);
        return undefined; // 数据已过期
      }

      const value = storage[key] ? JSON.parse(storage[key]) : null;
      return value;
    }
  }
  /**
   * 删除
   * @param key 键名
   */
  remove(key: string): void {
    if (key) {
      this.storage.removeItem(key);
      this.storage.removeItem(`${key}__expires__`);
    }
  }
}
