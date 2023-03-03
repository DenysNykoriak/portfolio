export class LocalStorageUtility<
  ValueType extends string | { [key: string]: unknown }
> {
  constructor(public localStorageKey: string, public defaultValue: ValueType) {}

  public getValue(): ValueType {
    if (typeof window === "undefined") return this.defaultValue;

    const localStorageValue = localStorage.getItem(this.localStorageKey);

    if (!localStorageValue) return this.defaultValue;

    if (typeof this.defaultValue === "string")
      return localStorageValue as ValueType;

    return JSON.parse(localStorageValue);
  }

  public setValue(newValue: ValueType) {
    if (typeof window === "undefined") return;

    if (newValue === this.defaultValue) {
      localStorage.removeItem(this.localStorageKey);
      return;
    }

    if (typeof this.defaultValue === "string") {
      localStorage.setItem(this.localStorageKey, newValue as string);
      return;
    }

    localStorage.setItem(this.localStorageKey, JSON.stringify(newValue));
  }
}
