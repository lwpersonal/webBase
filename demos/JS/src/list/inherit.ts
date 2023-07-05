/**
 * 继承
 */
export default function () {
  function Person() {
    this.name = 'lw';
  }
  Person.prototype.age = 14;

  function Child() {}
  Child.prototype = new Person();

  const child = new Child();

  log('child', child);
}
