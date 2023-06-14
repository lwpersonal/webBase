/**
 * 原型链
 */
export default function () {
  function Person() {
    //
  }
  Person.prototype.sex = 'boy';

  const person = new Person();
  person.name = 'lw';

  console.group('person');
  log('person: ', person);
  log('person.__proto__: ', person.__proto__, Object.getPrototypeOf(person));
  log('Object.getPrototypeOf(person): ', Object.getPrototypeOf(person));
  log(
    'person.__proto__ === Object.getPrototypeOf(person): ',
    person.__proto__ === Object.getPrototypeOf(person),
  );
  log(
    'person.__proto__.constructor === Person: ',
    person.__proto__.constructor === Person,
  );
  log('person instanceof Person: ', person instanceof Person);

  log('person instanceof Function: ', person instanceof Function);
  log('person instanceof Object: ', person instanceof Object);
  log('Person instanceof Function: ', Person instanceof Function);
  // 修改原型会影响结果
  Object.setPrototypeOf(person, {});
  log('person instanceof Person: ', person instanceof Person);

  console.groupEnd();

  console.group('Base');

  log('Function instanceof Function: ', Function instanceof Function);
  log('Object instanceof Function: ', Object instanceof Function);
  log('Function instanceof Object: ', Function instanceof Object);
  log('Object instanceof Object: ', Object instanceof Object);
  console.groupEnd();

  console.group('Other');
  const str1 = 'str1';
  const str2 = new String('str1');
  log('str1 instanceof String', str1 instanceof String);
  log('str1 instanceof Object', str1 instanceof Object);

  log('str2 instanceof String', str2 instanceof String);
  log('String instanceof Object', String instanceof Object);

  log('Null instanceof Object', null instanceof Object);
  log(
    'Object.create(null) instanceof Object',
    Object.create(null) instanceof Object,
  );
  console.groupEnd();

  console.group('self instanceof');
  function myInstanceof(object, constructor) {
    const prototypeObj = Object.getPrototypeOf(object);
    if (prototypeObj === null) {
      return false;
    } else if (prototypeObj === constructor.prototype) {
      return true;
    }
    return myInstanceof(prototypeObj, constructor);
  }

  log(
    'Function instanceof Function: ',
    Function instanceof Function,
    myInstanceof(Object, Object),
  );
  log(
    'Object instanceof Function: ',
    Object instanceof Function,
    myInstanceof(Object, Function),
  );
  log(
    'Function instanceof Object: ',
    Function instanceof Object,
    myInstanceof(Function, Object),
  );
  log(
    'Object instanceof Object: ',
    Object instanceof Object,
    myInstanceof(Object, Object),
  );

  console.groupEnd();
}
